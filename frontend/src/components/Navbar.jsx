import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, Dumbbell, Heart, Sun, Moon } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { theme, toggleTheme } = useTheme();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="glass-morphism fixed top-0 w-full z-50 border-b py-3 px-6 flex items-center justify-between" style={{ borderColor: 'var(--border-soft)' }}>
      <Link to="/" className="flex items-center gap-2 group transition-all">
        <Dumbbell className="text-primary group-hover:rotate-45 transition-transform duration-500" size={28} />
        <span className="text-xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
          ARXON<span className="text-primary italic"> FITNESS STORE</span>
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/shop" className="text-sm font-semibold hover:text-primary transition-colors" style={{ color: 'var(--text-secondary)' }}>SHOP</Link>
        <Link to="/about" className="text-sm font-semibold hover:text-primary transition-colors" style={{ color: 'var(--text-secondary)' }}>ABOUT</Link>
        
        <div className="flex items-center gap-3 ml-4 pl-4 border-l" style={{ borderColor: 'var(--border-medium)' }}>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="relative p-2 rounded-full transition-all group overflow-hidden"
            style={{ backgroundColor: 'var(--bg-elevated)' }}
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-500 ${theme === 'light' ? 'bg-primary/20 scale-100' : 'scale-0'}`} />
            {theme === 'dark' ? (
              <Sun size={18} className="text-primary relative z-10 group-hover:rotate-45 transition-transform duration-500" />
            ) : (
              <Moon size={18} className="text-primary relative z-10 group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2 rounded-full transition-all group" style={{ backgroundColor: 'var(--bg-elevated)' }}>
            <Heart size={20} className="group-hover:text-red-500 transition-colors" style={{ color: 'var(--text-secondary)' }} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 rounded-full transition-all" style={{ backgroundColor: 'var(--bg-elevated)' }}>
            <ShoppingCart size={20} style={{ color: 'var(--text-secondary)' }} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-dark-dark text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {userInfo ? (
            <div className="group relative">
              <button className="flex items-center gap-2 p-1 pl-3 pr-2 rounded-full transition-all" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                  {userInfo.name.split(' ')[0]}
                </span>
                <User size={18} className="text-primary" />
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="rounded-2xl p-2 w-48 shadow-2xl border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}>
                  {userInfo.isAdmin && (
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-sm rounded-lg transition-colors hover:text-white hover:bg-primary/20" style={{ color: 'var(--text-secondary)' }}>Admin Panel</Link>
                  )}
                  <Link to="/profile" className="block px-4 py-2 text-sm rounded-lg transition-colors hover:text-white hover:bg-primary/20" style={{ color: 'var(--text-secondary)' }}>Profile</Link>
                  <Link to="/myorders" className="block px-4 py-2 text-sm rounded-lg transition-colors hover:text-white hover:bg-primary/20" style={{ color: 'var(--text-secondary)' }}>My Orders</Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg flex items-center gap-2 mt-1 border-t pt-2"
                    style={{ borderColor: 'var(--border-soft)' }}
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-dark-dark font-bold text-xs transition-all uppercase tracking-widest">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
