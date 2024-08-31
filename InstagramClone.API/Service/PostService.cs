using Microsoft.Extensions.Options;
using Models;
using Models.DTO.Request;
using Repository;
using Repository.Interface;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;


        public PostService(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }
        public async Task<CustomActionResult> CreatePost(CreatePostRequest model)
        {
            CustomActionResult result = new CustomActionResult();

            var checkCratePostResult = await _postRepository.CreatePost(model);
            result.IsSuccess = checkCratePostResult.IsSuccess;
            result.Message = checkCratePostResult.Message;
            if (!result.IsSuccess) return result;

            return result;
        }
    }
}
