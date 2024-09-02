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
    public class CommentService:ICommentService
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
    }
}
