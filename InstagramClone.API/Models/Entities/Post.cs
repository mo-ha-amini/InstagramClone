using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Models.Entities
{
    public class Post
    {
        public int Id{ get; set; }
        public int UserId { get; set; }
        public string Caption { get; set; }
        public byte[] Media { get; set; }
        public IList<Like> Likes { get; set; } = new List<Like>();
        public IList<Comment> Comments { get; set; } = new List<Comment>();
        [JsonIgnore]
        public User User { get; set; }
    }
}
