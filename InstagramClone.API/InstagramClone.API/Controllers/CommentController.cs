using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models.DTO.Request;
using Service.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;

namespace InstagramClone.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [EnableCors("AllowLocalhost")]
    public class CommentController : Controller
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateComment(CreateCommentRequest model)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var userIdClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "UserId");
            if (userIdClaim != null)
            {
                model.UserId = int.Parse(userIdClaim.Value);
                return Ok(await _commentService.CreateComment(model));
            }
            else
            {
                return BadRequest();
            }
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetComments(int PostId)
        {
            return Ok(await _commentService.GetCommentsOfPostByPostId(PostId));
        }
    }
}
