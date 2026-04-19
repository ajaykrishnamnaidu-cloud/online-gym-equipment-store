import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Star } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: 1
    }));
  };

  return (
    <div
      className="group relative border rounded-3xl overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5"
      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)' }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute top-4 right-4 px-3 py-1 backdrop-blur rounded-full text-xs font-bold tracking-widest uppercase border" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', borderColor: 'var(--border-soft)' }}>
            ₹{product.price}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${i < Math.round(product.rating) ? 'text-primary fill-primary' : 'text-gray-600'}`}
              />
            ))}
            <span className="text-[10px] font-bold tracking-widest uppercase ml-1" style={{ color: 'var(--text-muted)' }}>
              ({product.numReviews} REVIEWS)
            </span>
          </div>

          <h3 className="text-lg font-bold mb-2 tracking-tight group-hover:text-primary transition-colors line-clamp-1" style={{ color: 'var(--text-primary)' }}>
            {product.name}
          </h3>
          <p className="text-xs mb-6 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>

          <button
            onClick={addToCartHandler}
            className="w-full py-3 hover:bg-primary hover:text-dark-dark rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border group-hover:border-primary/50"
            style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)', borderColor: 'var(--border-medium)' }}
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
