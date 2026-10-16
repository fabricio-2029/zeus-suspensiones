import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botField: '' // Filtro anti-bots
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    if (formData.botField !== '') {
      return; // Si es un bot, dejamos que Formspree lo ignore o frene
    }

    if (!formData.name || !formData.email || !formData.message) {
      e.preventDefault();
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!validateEmail(formData.email)) {
      e.preventDefault();
      setError('Por favor, ingresa un correo electrónico válido (ej: tu_correo@gmail.com).');
      return;
    }

    // Si pasa todas las validaciones, el formulario se envía nativamente a Formspree
  };

  return (
    <div style={styles.container}>
      <h2>Contáctanos - Zeus Suspensiones</h2>
      <p style={styles.subtitle}>Elegí el medio que prefieras para comunicarte con nuestro equipo técnico y de ventas.</p>

      {/* ACCESO RÁPIDO A WHATSAPP Y REDES */}
      <div style={styles.socialBox}>
        <h3 style={styles.socialTitle}>Canales Directos</h3>
        <div style={styles.socialButtonsGrid}>
          <a 
            href="https://wa.me/5491128250615?text=Hola!%20Me%20comunico%20desde%20la%20web%20de%20Zeus%20Suspensiones" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{...styles.socialBtn, backgroundColor: '#25d366', color: '#fff'}}
          >
            💬 WhatsApp Directo
          </a>
          <a 
            href="https://www.instagram.com/zeus_suspensiones/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{...styles.socialBtn, backgroundColor: '#c13584', color: '#fff'}}
          >
            📷 Instagram
          </a>
          <a 
            href="https://www.facebook.com/SuspensionesZeus" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{...styles.socialBtn, backgroundColor: '#1877f2', color: '#fff'}}
          >
            📘 Facebook
          </a>
          <a 
            href="https://www.tiktok.com/@zeussuspensiones" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{...styles.socialBtn, backgroundColor: '#000000', color: '#fff', border: '1px solid #444'}}
          >
            🎵 TikTok
          </a>
        </div>
      </div>

      <div style={styles.divider}><span>O dejanos tu consulta por formulario</span></div>

      {/* FORMULARIO INTEGRADO CON FORMSPREE */}
      <form 
        action="https://formspree.io/f/xqpewldv" 
        method="POST" 
        onSubmit={handleSubmit} 
        style={styles.form}
      >
        <div style={{ display: 'none' }}>
          <label>No completar este campo:</label>
          <input 
            type="text" 
            name="botField" 
            value={formData.botField} 
            onChange={handleChange} 
            tabIndex={-1} 
            autoComplete="off"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Nombre y Apellido</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            style={styles.input} 
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Correo Electrónico</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            style={styles.input} 
            placeholder="Ej: tu_correo@dominio.com"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Mensaje / Consulta</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            style={styles.textarea} 
            placeholder="Detallanos tu vehículo o consulta técnica..."
            rows="4"
          />
        </div>

        {error && <p style={styles.errorText}>{error}</p>}
        {successMessage && <p style={styles.successText}>{successMessage}</p>}

        <button type="submit" style={styles.button}>Enviar Consulta por Web</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    color: '#fff'
  },
  subtitle: {
    color: '#aaa',
    marginBottom: '1.5rem',
    fontSize: '0.95rem'
  },
  socialBox: {
    backgroundColor: '#1a1a1a',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
  },
  socialTitle: {
    fontSize: '1rem',
    color: '#ffcc00',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  socialButtonsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: '0.75rem'
  },
  socialBtn: {
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  divider: {
    textAlign: 'center',
    borderBottom: '1px solid #333',
    lineHeight: '0.1em',
    margin: '2rem 0',
    color: '#777',
    fontSize: '0.85rem'
  },
  form: {
    backgroundColor: '#1a1a1a',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  },
  label: {
    fontWeight: 'bold',
    color: '#ffcc00',
    fontSize: '0.9rem'
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #444',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '1rem'
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #444',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '1rem',
    resize: 'vertical'
  },
  errorText: {
    color: '#ff4d4d',
    backgroundColor: 'rgba(255, 77, 77, 0.1)',
    padding: '0.5rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    margin: 0
  },
  successText: {
    color: '#2ecc71',
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    padding: '0.5rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    margin: 0
  },
  button: {
    backgroundColor: '#ffcc00',
    color: '#111',
    border: 'none',
    padding: '0.85rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer'
  }
};