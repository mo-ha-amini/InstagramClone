using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models.DTO.Request;
using Service.Interface;

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
            return Ok(await _postService.CreatePost(model));
        }
    }
}
