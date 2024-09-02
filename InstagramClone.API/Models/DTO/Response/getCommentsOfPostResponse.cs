using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO.Response
{
    public class getCommentsOfPostResponse
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public int Id { get; set; }
        public int PostId { get; set; }
        public string CommentText { get; set; }
    }
}
