using Models.DTO.Request;
using Models.DTO.Response;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IUserService
    {
        Task<CustomActionResult> CreateUser(CreateUserRequest model);
        Task<CustomActionResult<LoginResponse>> LoginUserByUsernameAndPassword(LoginRequest model);
        Task<CustomActionResult<GetProfileByUsernameResponse>> GetUserProfileByUsername(string username);
        Task<CustomActionResult> Follow(int userId, int followingId);
        Task<CustomActionResult> UnFollow(int userId, int followingId);
        Task<CustomActionResult<List<getfollowerResponse>>> getFollowingsById(int userId);
        Task<CustomActionResult<List<getfollowerResponse>>> getFollowersById(int userId);
        Task<CustomActionResult<List<SearchUserRespone>>> SearchUser(string query);

    }
}
