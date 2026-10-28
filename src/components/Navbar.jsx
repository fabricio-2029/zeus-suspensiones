import React, { useState, useEffect } from 'react';

export default function Navbar({ currentTab, setCurrentTab, cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detecta si la pantalla es chica o grande en tiempo real
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (tab) => {
    setCurrentTab(tab);
    setIsOpen(false);
  };

  return (
    <nav style={styles.nav}>
  <div style={styles.logoContainer} onClick={() => handleNavClick('home')}>
    <img 
      src="/img/logo_redondo_zeus.jpeg" 
      alt="Zeus Suspensiones" 
      style={{ height: '110px', width: 'auto', borderRadius: '70%' }} 
    />
  </div>

      {/* Menú normal para escritorio o hamburguesa para celular según el tamaño real */}
      {!isMobile ? (
        <div style={styles.desktopMenu}>
          <button 
            style={currentTab === 'home' ? styles.activeLink : styles.link} 
            onClick={() => handleNavClick('home')}
          >
            Inicio / Productos
          </button>
          <button 
            style={currentTab === 'contact' ? styles.activeLink : styles.link} 
            onClick={() => handleNavClick('contact')}
          >
            Contáctanos
          </button>
          {/* Botón de Admin para Escritorio */}
          <button 
            style={currentTab === 'admin' ? styles.activeAdminLink : styles.adminLink} 
            onClick={() => handleNavClick('admin')}
          >
            ⚙️ Admin
          </button>
          <button 
            style={styles.cartButton} 
            onClick={() => handleNavClick('cart')}
          >
            🛒 Carrito <span style={styles.badge}>{cartCount}</span>
          </button>
        </div>
      ) : (
        /* Botón de Hamburguesa para Móvil */
        <div style={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
          <div style={styles.bar}></div>
        </div>
      )}

      {/* Menú desplegable Móvil */}
      {isMobile && isOpen && (
        <div style={styles.mobileMenu}>
          <button style={styles.mobileLink} onClick={() => handleNavClick('home')}>Inicio / Productos</button>
          <button style={styles.mobileLink} onClick={() => handleNavClick('contact')}>Contáctanos</button>
          <button style={styles.mobileLink} onClick={() => handleNavClick('admin')}>⚙️ Panel Admin</button>
          <button style={styles.mobileLink} onClick={() => handleNavClick('cart')}>🛒 Carrito ({cartCount})</button>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#111',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
  },
  logoContainer: {
    cursor: 'pointer'
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: '#ffcc00'
  },
  desktopMenu: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  activeLink: {
    background: 'none',
    border: 'none',
    color: '#ffcc00',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  adminLink: {
    background: 'none',
    border: '1px dashed #ffcc00',
    color: '#ffcc00',
    padding: '0.3rem 0.6rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    cursor: 'pointer'
  },
  activeAdminLink: {
    background: '#ffcc00',
    border: '1px solid #ffcc00',
    color: '#111',
    padding: '0.3rem 0.6rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  cartButton: {
    backgroundColor: '#ffcc00',
    border: 'none',
    color: '#111',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    cursor: 'pointer'
  },
  bar: {
    width: '25px',
    height: '3px',
    backgroundColor: '#fff'
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: '#111',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 0',
    borderTop: '1px solid #333'
  },
  mobileLink: {
    background: 'none',
    border: 'none',
    color: '#fff',
    padding: '1rem 2rem',
    textAlign: 'left',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};
