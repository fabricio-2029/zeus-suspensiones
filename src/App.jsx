import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Admin from './components/Admin'; // <--- 1. Importamos el componente Admin

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`¡${product.name} agregado al carrito!`);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        cartCount={cart.length} 
      />

      <main>
        {currentTab === 'home' && <Products addToCart={addToCart} />}
        {currentTab === 'contact' && <Contact />}
        {currentTab === 'cart' && (
  <Cart 
    cart={cart} 
    removeFromCart={removeFromCart} 
    clearCart={() => setCart([])} 
  />
)}
        {currentTab === 'admin' && <Admin />} {/* <--- 2. Renderizamos el panel admin cuando la pestaña sea 'admin' */}
      </main>
    </div>
  );
}