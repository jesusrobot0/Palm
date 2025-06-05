import React, { useState } from 'react';
import { PalmSync } from './sync';
import { ServerService } from '@core/ServerService';

const App: React.FC = () => {
  const [mode, setMode] = useState<'none' | 'host' | 'client'>('none');
  const [ip, setIp] = useState('');
  const [connected, setConnected] = useState(false);

  const handleHost = () => {
    const newServer = new ServerService(8080);
    newServer.start();
    setMode('host');
  };

  const handleClientConnect = () => {
    const instance = new PalmSync(`ws://${ip}:8080`);
    instance.start();
    setConnected(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>Palm 🏝</h1>

        {mode === 'none' && (
          <>
            <p style={styles.subtitle}>Selecciona el modo:</p>
            <div style={styles.buttonGroup}>
              <button style={styles.button} onClick={handleHost}>Ser Host</button>
              <button style={styles.button} onClick={() => setMode('client')}>Ser Cliente</button>
            </div>
          </>
        )}

        {mode === 'client' && !connected && (
          <>
            <h2 style={styles.subtitle}>Modo Cliente</h2>
            <div style={styles.inputGroup}>
              <input
                type="text"
                placeholder="IP del servidor"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                style={styles.input}
              />
              <button style={styles.button} onClick={handleClientConnect}>Conectar</button>
            </div>
          </>
        )}

        {mode === 'client' && connected && (
          <>
            <h2 style={styles.subtitle}>Cliente conectado</h2>
            <p>✅ Conectado a {ip}</p>
          </>
        )}

        {mode === 'host' && (
          <>
            <h2 style={styles.subtitle}>Modo Host</h2>
            <p>✅ Escuchando en puerto 8080</p>
          </>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: '40px',
    borderRadius: '12px',
    width: '400px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
  },
  inputGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    flex: 1,
    fontSize: '16px',
  }
};

export default App;