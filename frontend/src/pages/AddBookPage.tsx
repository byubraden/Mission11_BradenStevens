import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function DonatePage() {
  const navigate = useNavigate();
  const { bookId, title, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      bookName: title || 'No Project Found',
      quantity,
      price: price ? Number(price) : 0,
      subtotal: price ? Number(price) * quantity : 0,
    };

    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <div className="container mt-5">
      {/* I added a shadow and a card to this section which we haven't done before in this class*/}
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">
          Add <span className="text-primary">{title}</span> to Your Cart
        </h2>

        {/* Book Quantity Enter */}
        <div className="mb-3">
          <label className="form-label fw-bold">Quantity</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={quantity}
            onChange={(x) => setQuantity(Number(x.target.value))}
          />
        </div>

        {/* Add to Cart Button */}
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-success w-100" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        {/* Navigation Button */}
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonatePage;
