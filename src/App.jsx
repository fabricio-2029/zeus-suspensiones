import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Admin from './components/Admin';

// Componente de la cajita de historia para la Home
function HistoriaSection() {
  return (
    <div style={styles.historyContainer}>
      <h2 style={styles.historyTitle}>Sobre Zeus Suspensiones</h2>
      <p style={styles.historyText}>
        Nos apasiona el rubro automotor, mas de 9 años en el sector nos avalan nacimos con el objetivo de brindar soluciones de máxima calidad en suspensión, combinando experiencia, asesoramiento personalizado y los mejores componentes para que cada vehículo rinda al máximo en la calle o en la ruta.
      </p>
    </div>
  );
}

// Componente del Footer oficial
function Footer() {
  return (
    <footer style={styles.footerContainer}>
      <p style={styles.footerText}>
        © {new Date().getFullYear()} <strong>Zeus Suspensiones</strong> - Todos los derechos reservados. | Marca registrada.
      </p>
    </footer>
  );
}

const styles = {
  historyContainer: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '2rem 1rem',
    textAlign: 'center',
    margin: '1.5rem auto',
    maxWidth: '900px',
    borderRadius: '8px',
    border: '1px solid #333',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
  },
  historyTitle: {
    color: '#ffcc00',
    fontSize: '1.5rem',
    marginBottom: '0.75rem',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  },
  historyText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#ccc',
    maxWidth: '750px',
    margin: '0 auto'
  },
  footerContainer: {
    backgroundColor: '#111',
    color: '#aaa',
    textAlign: 'center',
    padding: '1.5rem 1rem',
    marginTop: '3rem',
    borderTop: '1px solid #333',
    fontSize: '0.9rem',
    letterSpacing: '0.5px'
  },
  footerText: {
    margin: 0
  }
};

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
        {currentTab === 'home' && (
          <>
            <HistoriaSection />
            <Products addToCart={addToCart} />
          </>
        )}
        {currentTab === 'contact' && <Contact />}
        {currentTab === 'cart' && (
          <Cart 
            cart={cart} 
            removeFromCart={removeFromCart} 
            clearCart={() => setCart([])} 
          />
        )}
        {currentTab === 'admin' && <Admin />}
      </main>

      {/* Footer agregado abajo de todo */}
      <Footer />
    </div>
  );
}
