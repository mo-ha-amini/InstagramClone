using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO.Request
{
    public class CreatePostRequest
    {
        public int UserId { get; set; }

        //[Required]
        public string Caption { get; set; }

        //[Required]
        public IFormFile MediaFile { get; set; }
    }
}
