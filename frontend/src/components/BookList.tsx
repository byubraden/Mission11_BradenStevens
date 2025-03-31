import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import CartSummary from './CartSummary';
import { fetchBooks } from '../api/BooksApi';
import Pagination from './Pagination';

// Book list component
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('title');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortBy, selectedCategories]);

  return (
    <>
      <CartSummary />
      <h1>Book List</h1>
      <br />

      {/* Sort by dropdown */}
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

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      navigate(`/addBook/${b.bookId}/${b.title}/${b.price}`)
                    }
                  >
                    Add Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
