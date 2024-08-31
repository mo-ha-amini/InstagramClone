using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string CommentText { get; set; }
        public string CommentBy { get; set; }
        [JsonIgnore]
        public Post Post { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }
}
