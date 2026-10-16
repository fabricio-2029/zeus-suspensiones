import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Estados del formulario
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Estado para la lista de productos (para poder borrarlos)
  const [products, setProducts] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Noelia2026?') {
      setIsAuthenticated(true);
      fetchProducts(); // Cargamos los productos al entrar
    } else {
      alert('Contraseña incorrecta');
    }
  };

  // Función para obtener los productos de Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "product"));
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(list);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !imageFile) {
      alert('Por favor completá los campos y seleccioná una foto.');
      return;
    }

    setLoading(true);
    setMessage('Subiendo imagen a Cloudinary...');

    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'zeusPreset');

      const cloudName = 'do0veh4r'; 
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      
      const fileData = await res.json();
      const imageUrl = fileData.secure_url;

      if (!imageUrl) {
        throw new Error('No se pudo obtener la URL de la imagen.');
      }

      setMessage('Guardando producto en Firebase...');

      await addDoc(collection(db, "product"), {
        name: name,
        description: description,
        price: Number(price),
        image: imageUrl,
        imagen: imageUrl
      });

      setMessage('¡Producto agregado con éxito!');
      setName('');
      setDescription('');
      setPrice('');
      setImageFile(null);
      e.target.reset();
      
      // Actualizamos la lista en pantalla
      fetchProducts();

    } catch (error) {
      console.error("Error al crear el producto:", error);
      setMessage('Hubo un error al subir el producto.');
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un producto
  const handleDelete = async (id, productName) => {
    if (window.confirm(`¿Estás seguro de que querés eliminar "${productName}"?`)) {
      try {
        await deleteDoc(doc(db, "product", id));
        alert('Producto eliminado correctamente.');
        fetchProducts(); // Refrescamos la lista
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert('Hubo un error al intentar eliminar el producto.');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <h2>Panel de Administración - Zeus Suspensiones</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="password" 
            placeholder="Contraseña de administrador" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Ingresar</button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <h2>Cargar Nuevo Producto</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="text" 
            placeholder="Nombre del producto" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <textarea 
            placeholder="Descripción" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
          <input 
            type="number" 
            placeholder="Precio" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
            required
          />
          <label style={styles.label}>Foto del producto:</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={styles.input}
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Procesando...' : 'Guardar Producto'}
          </button>
          {message && <p style={styles.msg}>{message}</p>}
        </form>
      </div>

      {/* Sección de administración / listado para borrar */}
      <div style={styles.listContainer}>
        <h3>Productos Cargados en la Base de Datos</h3>
        {products.length === 0 ? (
          <p>No hay productos cargados todavía.</p>
        ) : (
          <div style={styles.grid}>
            {products.map((prod) => (
              <div key={prod.id} style={styles.card}>
                <img src={prod.image || prod.imagen} alt={prod.name} style={styles.thumb} />
                <div style={styles.cardInfo}>
                  <h4>{prod.name}</h4>
                  <p>${prod.price}</p>
                </div>
                <button 
                  onClick={() => handleDelete(prod.id, prod.name)} 
                  style={styles.deleteButton}
                >
                  🗑️ Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  mainContainer: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  container: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  listContainer: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    minHeight: '100px'
  },
  label: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: '#333'
  },
  button: {
    backgroundColor: '#111',
    color: '#ffcc00',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  msg: {
    marginTop: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#27ae60'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem',
    border: '1px solid #eee',
    borderRadius: '6px',
    backgroundColor: '#fafafa'
  },
  thumb: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  cardInfo: {
    flex: 1,
    marginLeft: '1rem'
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};