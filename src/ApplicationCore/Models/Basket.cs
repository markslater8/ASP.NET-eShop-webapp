﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Models
{
    public class Basket
    {
        public int BasketId { get; set; }
        public int OwnerId { get; set; }
        public List<BasketItem> BasketItems { get; set; }
    }
}
