using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models.DTO.Request;
using Service;
using Service.Interface;

namespace InstagramClone.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [EnableCors("AllowLocalhost")]

    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> SignIn(CreateUserRequest model)
        {
            return Ok(await _userService.CreateUser(model));
        }


        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest model)
        {
            return Ok(await _userService.LoginUserByUsernameAndPassword(model));
        }

        [HttpGet]
        //[Authorize]
        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserProfileByUsername(string username)
        {
            return Ok(await _userService.GetUserProfileByUsername(username));
        }
    }
}
