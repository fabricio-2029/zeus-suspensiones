import React from 'react';

export default function Cart({ cart, removeFromCart, clearCart }) {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    // Armamos el texto del mensaje con los productos
    let message = 'Hola! Vengo de la web de Zeus Suspensiones y quiero solicitar el siguiente presupuesto:\n\n';
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* - $${Number(item.price).toLocaleString()}\n`;
    });

    message += `\n*Total Estimado: $${total.toLocaleString()}*\n\nQuedo a la espera de confirmación. ¡Gracias!`;

    // Codificamos el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '5491128250615'; // Número de WhatsApp de Zeus

    // Abrimos WhatsApp en una pestaña nueva
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

    //Opcional: Si querés vaciar el carrito después de enviar, podés descomentar la siguiente línea si tenés la función en las props:
     if (clearCart) clearCart();
  };

  return (
    <div style={styles.container}>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p style={styles.empty}>Tu carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} style={styles.cartItem}>
              <div style={styles.itemInfo}>
                <img src={item.image} alt={item.name} style={styles.itemImage} />
                <div>
                  <h4>{item.name}</h4>
                  <p>${Number(item.price).toLocaleString()}</p>
                </div>
              </div>
              <button style={styles.removeButton} onClick={() => removeFromCart(index)}>
                Eliminar
              </button>
            </div>
          ))}
          <div style={styles.totalContainer}>
            <h3>Total: ${total.toLocaleString()}</h3>
            <button style={styles.checkoutButton} onClick={handleWhatsAppCheckout}>
              💬 Solicitar Producto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    color: '#fff'
  },
  empty: {
    marginTop: '1.5rem',
    color: '#aaa'
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    borderBottom: '1px solid #333'
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  itemImage: {
    width: '70px',
    height: '70px',
    objectFit: 'contain',
    backgroundColor: '#111',
    borderRadius: '4px',
    padding: '2px'
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  totalContainer: {
    marginTop: '2rem',
    textAlign: 'right'
  },
  checkoutButton: {
    backgroundColor: '#25d366', // Color verde oficial de WhatsApp
    color: '#fff',
    border: 'none',
    padding: '0.85rem 1.5rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
    boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)'
  }
};