using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models;

using Models.DTO.Request;
using Models.DTO.Response;
using Models.Entities;
using Repository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Service
{
    public interface IUserService
    {
        Task<CustomActionResult> CreateUser(CreateUserRequest model);
        Task<CustomActionResult<LoginResponse>> LoginUserByUsernameAndPassword(LoginRequest model);

    }
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
            if (!result.IsSuccess) return result;
            //throw new NotImplementedException();
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
    }
}
