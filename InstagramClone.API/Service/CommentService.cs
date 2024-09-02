using Models;
using Models.DTO.Request;
using Models.DTO.Response;
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
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;


        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<CustomActionResult> CreateComment(CreateCommentRequest model)
        {
            CustomActionResult result = new CustomActionResult();

            var checkResult = await _commentRepository.CreateComment(model);
            result.IsSuccess = checkResult.IsSuccess;
            result.Message = checkResult.Message;

            return result;
        }

        public async Task<CustomActionResult<List<getCommentsOfPostResponse>>> GetCommentsOfPostByPostId(int PostId)
        {
            CustomActionResult<List<getCommentsOfPostResponse>> result= new CustomActionResult<List<getCommentsOfPostResponse>>();

            var checkResult = await _commentRepository.GetCommentsOfPostByPostId(PostId);
            result.IsSuccess = checkResult.IsSuccess;
            result.Message = checkResult.Message;
            result.Data = checkResult.Data;

            return result;
        }
    }
}
