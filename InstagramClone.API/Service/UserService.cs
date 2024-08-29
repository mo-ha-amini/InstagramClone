using Models;

using Models.DTO.Request;
using Models.Entities;
using Repository;

namespace Service
{
    public interface IUserService
    {
        Task<CustomActionResult> CreateUser(CreateUserRequest model);
    }
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
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
    }
}
