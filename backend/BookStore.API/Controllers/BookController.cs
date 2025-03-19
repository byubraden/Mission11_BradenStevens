using BookStore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookstoreContext _bookstoreContext;
        
        public BookController(BookstoreContext temp)
        {
            _bookstoreContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult getBooks(int pageSize = 10, int pageNum = 1, string sortBy = "none")
        {
            var query = _bookstoreContext.Books.AsQueryable();

            if (sortBy.ToLower() == "title")
            {
                query = query.OrderBy(b => b.Title);
            }
            // Add other sorting options if needed

            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookstoreContext.Books.Count();

            var returnObject = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(returnObject);
        }

    }
}
