import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Cart Summary component
const CartSummary = () => {
  const { cart, total } = useCart(); // Destructure cart and total from context
  const navigate = useNavigate();

  // Calculate total quantity
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
        width: '130px',
      }}
      onClick={() => navigate('/cart')}
    >
      <span>🛒</span>
      <div style={{ textAlign: 'right' }}>
        <div>
          <strong>{totalQuantity}</strong> items
        </div>
        <div>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
