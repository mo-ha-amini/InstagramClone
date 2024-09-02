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
    public class PostController : Controller
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePost(CreatePostRequest model)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var userIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "UserId");
            if (userIdClaim != null)
            {
                model.UserId = int.Parse(userIdClaim.Value);
            }

            return Ok(await _postService.CreatePost(model));
        }

        [HttpGet]
        //[Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserPostById(int id)
        {
            return Ok(await _postService.GetPostByUserId(id));
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetFeedPosts()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var userIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "UserId");
            if (userIdClaim != null)
            {
                var UserId = int.Parse(userIdClaim.Value);
                return Ok(await _postService.GetFeedPosts(UserId));
            }
            else
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> LikePost(int PostId)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var userIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "UserId");
            if (userIdClaim != null)
            {
                int UserId = int.Parse(userIdClaim.Value);
                return Ok(await _postService.likePost(UserId, PostId));
            }
            else
            {
                return BadRequest();    
            }

        }
    }
}
