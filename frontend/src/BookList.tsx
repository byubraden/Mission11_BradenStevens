import { useEffect, useState } from 'react';
import { Book } from './types/Book';

// Book list component
function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('title');

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalBooks(data.totalNumBooks);
      setTotalPages(Math.ceil(totalBooks / pageSize));
    };

    fetchProjects();
  }, [pageSize, pageNum, totalBooks, sortBy]);

  return (
    <>
      <h1>Book List</h1>

      <br />

      <div className="container">
        <div className="row justify-content-center">
            {/* Display the list of books */}
          {books.map((b) => (
            <div className="col-12 col-md-6 mb-3" key={b.bookId}>
              <div className="card">
                <h3 className="card-title">{b.title}</h3>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li>
                      <strong>Author:</strong> {b.author}
                    </li>
                    <li>
                      <strong>Publisher:</strong> {b.publisher}
                    </li>
                    <li>
                      <strong>ISBN:</strong> {b.isbn}
                    </li>
                    <li>
                      <strong>Classification:</strong> {b.classification}
                    </li>
                    <li>
                      <strong>Category:</strong> {b.category}
                    </li>
                    <li>
                      <strong>Number of Pages:</strong> {b.pageCount}
                    </li>
                    <li>
                      <strong>Price:</strong> {b.price}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center my-3">
        <button
          className="btn btn-primary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        <div className="btn-group">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`btn ${pageNum === index + 1 ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setPageNum(index + 1)}
              disabled={pageNum === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className="btn btn-primary ms-2"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      <div className="d-flex justify-content-center my-3">
        <label className="me-2 fw-bold">Results per page:</label>
        <select
          className="form-select w-auto"
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <div className="d-flex justify-content-center my-3">
        <label className="me-2 fw-bold">Sort by:</label>
        <select
          className="form-select w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="none">None (Default Order)</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>
    </>
  );
}

export default BookList;
