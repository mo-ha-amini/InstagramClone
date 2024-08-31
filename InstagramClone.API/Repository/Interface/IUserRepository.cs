using Models.DTO.Request;
using Models.DTO.Response;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Entities;

namespace Repository.Interface
{
    public interface IUserRepository
    {
        Task<CustomActionResult> CreateUser(CreateUserRequest model);
        Task<CustomActionResult<LoginResponse>> GetUserByUsernameAndPassword(LoginRequest model);
        Task<CustomActionResult<GetProfileByUsernameResponse>> GetUserProfileByUsername(string username);
        Task<CustomActionResult> Follow(int userId, int followingId);
        Task<CustomActionResult> UnFollow(int userId, int followingId);


    }
}
