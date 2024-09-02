using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models.DTO.Request;
using Models.Entities;
using Service;
using Service.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;

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

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Follow(int followingId)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var userIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "UserId");
            if (userIdClaim != null)
            {
                var UserId = int.Parse(userIdClaim.Value);
                return Ok(await _userService.Follow(UserId, followingId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UnFollow(int followingId)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var userIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "UserId");
            if (userIdClaim != null)
            {
                var UserId = int.Parse(userIdClaim.Value);
                return Ok(await _userService.UnFollow(UserId, followingId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> GetFollowers(int UserId)
        {   
            return Ok(await _userService.getFollowersById(UserId));
        }

        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> GetFollowings(int UserId)
        {
            return Ok(await _userService.getFollowingsById(UserId));
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> SearchUser(string query)
        {
            return Ok(await _userService.SearchUser(query));
        }
    }
}
