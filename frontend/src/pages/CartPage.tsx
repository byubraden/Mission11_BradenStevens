import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Cart</h2>

      {/* Cart Items Section */}
      {cart.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Book Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: CartItem) => (
                <tr key={item.bookId}>
                  <td>{item.bookName}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${item.subtotal.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.bookId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cart Total Section */}
      {cart.length > 0 && (
        <div className="d-flex justify-content-end mt-3">
          <h3 className="fw-bold">Total: ${total.toFixed(2)}</h3>
        </div>
      )}

      {/* Buttons Section */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-success">Checkout</button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/books')}
        >
          Continue Browsing Books
        </button>
      </div>
    </div>
  );
}

export default CartPage;
