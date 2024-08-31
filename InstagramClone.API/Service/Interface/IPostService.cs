using Models.DTO.Request;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Entities;

namespace Service.Interface
{
    public interface IPostService
    {
        Task<CustomActionResult> CreatePost(CreatePostRequest model);
        Task<CustomActionResult<List<Post>>> GetPostByUserId(int id);
    }
}
