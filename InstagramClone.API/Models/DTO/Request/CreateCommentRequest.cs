﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTO.Request
{
    public class CreateCommentRequest
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string CommentText { get; set; }
    }
}
