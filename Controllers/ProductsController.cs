﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ganges.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsAsync()
        {
            //Retreiving the data like this should really be done in a service
            using (var context = new GangesDbContext())
            {
                var products = await context.Products.ToListAsync();
                return products;
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductAsync(int id)
        {
            using (var context = new GangesDbContext())
            {
                // SingleOrDefault returns the Product with the specified ID, or returns null if it doesn't exist.
                var product = await context.Products.SingleOrDefaultAsync(x => x.Id == id);

                // If the product is not found then return a 404 status code.
                if (product == null)
                {
                    return NotFound();
                }
                // If the product is found then return a 200 status code along with the product.
                else
                {
                    return Ok(product);
                }
            }
        }

        [HttpPost("buy")]
        // Here I am using the [FromBody] binding source attritube to tell the action method that the id parameter is coming
        // from the body of the request.
        public async Task<ActionResult> BuyProduct([FromBody]int id)
        {
            using (var context = new GangesDbContext())
            {
                // Find a product with the specified id.
                var product = await context.Products.SingleOrDefaultAsync(x => x.Id == id);

                if (product == null)
                {
                    // Respond withe a 404 status code.
                    return NotFound();
                }
                else
                {
                    // Reduce the quantity of the product by 1.
                    product.Quantity -= 1;

                    // Update the database.
                    await context.SaveChangesAsync();

                    // Respond with a 200 status code.
                    return Ok();
                }
            }
        }
    }
}
