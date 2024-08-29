using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO.Response
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }
        public string PhoneNumber { get; set; }
    }
}
