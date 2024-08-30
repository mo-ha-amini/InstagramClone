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

    }
}
