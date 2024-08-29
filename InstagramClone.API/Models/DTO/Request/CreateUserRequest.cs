using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO.Request
{
    public class CreateUserRequest
    {
        //[Required]
        //public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Gender { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Name { get; set; }
        public string Bio { get; set; }
        public string PhoneNumber { get; set; }
    }
}
