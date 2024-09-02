using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models;

using Models.DTO.Request;
using Models.DTO.Response;
using Models.Entities;
using Repository.Interface;
using Service.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Text;

namespace Service
{
    
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtConfigModel _jwtConfigModel;


        public UserService(IUserRepository userRepository, IOptions<JwtConfigModel> jwtConfigModel)
        {
            _userRepository = userRepository;
            _jwtConfigModel = jwtConfigModel.Value;
        }
        public async Task<CustomActionResult> CreateUser(CreateUserRequest model)
        {
            CustomActionResult result = new CustomActionResult();
            model.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);    

            var checkCrateUserResult = await _userRepository.CreateUser(model);
            result.IsSuccess = checkCrateUserResult.IsSuccess;
            result.Message = checkCrateUserResult.Message;

            return result;
        }

        public async Task<CustomActionResult> Follow(int userId, int followingId)
        {

            CustomActionResult result = new CustomActionResult();

            var checkFollowResult = await _userRepository.Follow(userId, followingId);
            result.IsSuccess = checkFollowResult.IsSuccess;
            result.Message = checkFollowResult.Message;

            return result;
        }

        public async Task<CustomActionResult> UnFollow(int userId, int followingId)
        {

            CustomActionResult result = new CustomActionResult();

            var checkUnFollowResult = await _userRepository.UnFollow(userId, followingId);
            result.IsSuccess = checkUnFollowResult.IsSuccess;
            result.Message = checkUnFollowResult.Message;

            return result;
        }

        public async Task<CustomActionResult<GetProfileByUsernameResponse>> GetUserProfileByUsername(string username)
        {
            CustomActionResult<GetProfileByUsernameResponse> result = new CustomActionResult<GetProfileByUsernameResponse>();

            var checkProfileResult = await _userRepository.GetUserProfileByUsername(username);

            result.IsSuccess = checkProfileResult.IsSuccess;
            result.Message = checkProfileResult.Message;
            result.Data = checkProfileResult.Data;

            return result;
        }

        public async Task<CustomActionResult<LoginResponse>> LoginUserByUsernameAndPassword(LoginRequest model)
        {
            CustomActionResult<LoginResponse> result = new CustomActionResult<LoginResponse>();

            var checkUserResult = await _userRepository.GetUserByUsernameAndPassword(model);
            result.IsSuccess = checkUserResult.IsSuccess;
            result.Message = checkUserResult.Message;
            if (!result.IsSuccess) return result;

            SymmetricSecurityKey secrectKey = new(Encoding.UTF8.GetBytes(_jwtConfigModel.Key));

            SigningCredentials signingCredentials = new(secrectKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken tokenOptions = new(
                claims: new List<Claim>
                {
                     new("UserId", checkUserResult.Data.Id.ToString()),
                },
                expires: DateTime.Now.AddMinutes(_jwtConfigModel.ExpireMinute),
                signingCredentials: signingCredentials
            );
            result.IsSuccess = true;

            var res = new LoginResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions),
                Id = checkUserResult.Data.Id,
                Username = checkUserResult.Data.Username,
                Email = checkUserResult.Data.Email,
                Gender = checkUserResult.Data.Gender,
                Name = checkUserResult.Data.Name,
                Bio = checkUserResult.Data.Bio,
                PhoneNumber = checkUserResult.Data.PhoneNumber,
            };
            result.Data = res;

            return result;

        }

        public async Task<CustomActionResult<List<getfollowerResponse>>> getFollowingsById(int userId)
        {
            CustomActionResult<List<getfollowerResponse>> result = new CustomActionResult<List<getfollowerResponse>>();

            var checkResult = await _userRepository.getFollowingsById(userId);

            result.IsSuccess = checkResult.IsSuccess;
            result.Message = checkResult.Message;
            result.Data = checkResult.Data;

            return result;
        }

        public async Task<CustomActionResult<List<getfollowerResponse>>> getFollowersById(int userId)
        {
            CustomActionResult<List<getfollowerResponse>> result = new CustomActionResult<List<getfollowerResponse>>();

            var checkResult = await _userRepository.getFollowersById(userId);

            result.IsSuccess = checkResult.IsSuccess;
            result.Message = checkResult.Message;
            result.Data = checkResult.Data;

            return result;
        }

        public async Task<CustomActionResult<List<SearchUserRespone>>> SearchUser(string query)
        {
            CustomActionResult<List<SearchUserRespone>> result = new CustomActionResult<List<SearchUserRespone>>();

            var checkResult = await _userRepository.SearchUser(query);

            result.IsSuccess = checkResult.IsSuccess;
            result.Message = checkResult.Message;
            result.Data = checkResult.Data;

            return result;
        }
    }
}
