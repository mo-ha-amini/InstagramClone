using Models.DTO.Request;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.DTO.Response;

namespace Service.Interface
{
    public interface ICommentService
    {
        Task<CustomActionResult> CreateComment(CreateCommentRequest model);
        Task<CustomActionResult<List<getCommentsOfPostResponse>>> GetCommentsOfPostByPostId(int PostId);

    }
}
