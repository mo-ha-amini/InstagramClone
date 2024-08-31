using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO.Response
{
    public class GetProfileByUsernameResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }
        public string PhoneNumber { get; set; }
        public int FollowerCount { get; set; }
        public int FollowingCount { get; set; }
        public IList<Post> Posts { get; set; }  
    }
}
