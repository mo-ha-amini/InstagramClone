using Microsoft.Extensions.Options;
using Models;
using Models.DTO.Request;
using Models.DTO.Response;
using Models.Entities;
using Repository;
using Repository.Interface;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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

        public async Task<CustomActionResult<List<getFeedPostResponse>>> GetFeedPosts(int userId)
        {
            CustomActionResult<List<getFeedPostResponse>> result = new CustomActionResult<List<getFeedPostResponse>>();

            var checkPostResult = await _postRepository.GetFeedPosts(userId);
            result.IsSuccess = checkPostResult.IsSuccess;
            result.Message = checkPostResult.Message;
            result.Data = checkPostResult.Data;

            return result;
        }

        public async Task<CustomActionResult<List<Post>>> GetPostByUserId(int id)
        {
            CustomActionResult<List<Post>> result = new CustomActionResult<List<Post>>();

            var checkCratePostResult = await _postRepository.GetPostByUserId(id);
            result.IsSuccess = checkCratePostResult.IsSuccess;
            result.Message = checkCratePostResult.Message;
            result.Data = checkCratePostResult.Data;
            if (!result.IsSuccess) return result;

            return result;
        }
    }
}
