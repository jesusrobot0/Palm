import React, { useState } from 'react';
import { PalmSync } from './sync';

const App: React.FC = () => {
  const [ip, setIp] = useState('');
  const [connected, setConnected] = useState(false);
  const [sync, setSync] = useState<PalmSync | null>(null);

  const handleConnect = () => {
    const instance = new PalmSync(`ws://${ip}:8080`);
    instance.start();
    setSync(instance);
    setConnected(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Palm 🏝</h1>

      {!connected ? (
        <div>
          <input
            type="text"
            placeholder="IP del servidor"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <button onClick={handleConnect}>Conectar</button>
        </div>
      ) : (
        <p>✅ Conectado a {ip}</p>
      )}
    </div>
  );
};

export default App;