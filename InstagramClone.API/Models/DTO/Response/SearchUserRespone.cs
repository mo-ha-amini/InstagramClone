using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO.Response
{
    public class SearchUserRespone
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        //public byte[] Avatar { get; set; }
    }
}
