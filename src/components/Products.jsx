import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Products({ addToCart }) {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "product"));
        const items = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const imageUrl = data.image || data.imagen || data.img || data.foto || data.url || '';
          return {
            id: doc.id,
            ...data,
            image: imageUrl,
            imagen: imageUrl,
            img: imageUrl
          };
        });
        setProductsList(items);
      } catch (error) {
        console.error("Error al cargar los productos de Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '3rem', color: '#fff' }}>Cargando productos de Zeus...</h2>;
  }

  return (
    <div style={styles.container}>
      <h2>Zeus Suspensiones - Catálogo Oficial</h2>
      <div style={styles.grid}>
        {productsList.map(product => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <div style={styles.cardContent}>
              <h3>{product.name}</h3>
              <p style={styles.desc}>{product.description}</p>
              <p style={styles.price}>
                {product.price > 0 ? `$${Number(product.price).toLocaleString()}` : 'Consultar Precio'}
              </p>
              <button style={styles.button} onClick={() => addToCart(product)}>
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginTop: '1.5rem'
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  image: {
    width: '100%',
    height: '340px',
    objectFit: 'contain',
    backgroundColor: '#111',
    padding: '4px'
  },
  cardContent: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  desc: {
    color: '#666',
    fontSize: '0.9rem',
    margin: '0.5rem 0'
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#27ae60',
    margin: '1rem 0'
  },
  button: {
    backgroundColor: '#111',
    color: '#ffcc00',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};