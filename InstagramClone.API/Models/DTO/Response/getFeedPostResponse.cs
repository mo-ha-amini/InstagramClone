using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO.Response
{
    public class getFeedPostResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string UserImage { get; set; }
        public string Caption { get; set; }
        public byte[] Media { get; set; }
        public IList<Like>? Likes { get; set; }
        public IList<Comment>? Comments { get; set; }

        public string LikesJson { get; set; }
        public string CommentsJson { get; set; }

    }
}
