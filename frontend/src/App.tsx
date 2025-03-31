import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';
import AddBookPage from './pages/AddBookPage';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      {/* CartProvider wraps the entire application */}
      <CartProvider>
        {/* Router and Routes for navigation */}
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route
              path="/addBook/:bookId/:title/:price"
              element={<AddBookPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
