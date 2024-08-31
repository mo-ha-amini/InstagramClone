using System.Xml.Linq;

namespace Models.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }
        public string PhoneNumber { get; set; }


        public IList<Follower> Followers { get; private set; } = new List<Follower>();
        public IList<Following> Followings { get; private set; } = new List<Following>();
        public IList<Post> Posts { get; private set; } = new List<Post>();
        public IList<Like> Likes { get; private set; } = new List<Like>();
        public IList<Comment> Comments { get; private set; } = new List<Comment>();
    }
}
