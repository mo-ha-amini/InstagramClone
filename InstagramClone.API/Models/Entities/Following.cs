﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models.Entities
{
    public class Following
    {
        public int Id { get; set; }
        public int FollowingUserId { get; set; }
        public int UserId { get; set; }
        public DateTime DateFollowed { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }
}
