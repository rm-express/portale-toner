import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState('');
  const [activeTab, setActiveTab] = useState('nuovoRitiro');

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleNewRequest = () => {
    if (newRequest) {
      setRequests([...requests, { id: requests.length + 1, description: newRequest, status: 'In attesa' }]);
      setNewRequest('');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <nav style={{ backgroundColor: '#007BFF', padding: '10px 20px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Portale Toner</h1>
        {isLoggedIn && (
          <button onClick={() => setIsLoggedIn(false)} style={{ backgroundColor: '#ff4d4d', border: 'none', padding: '8px 12px', color: '#fff', borderRadius: '4px' }}>Logout</button>
        )}
      </nav>

      <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '40px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {!isLoggedIn ? (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Accedi</h2>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
              onClick={handleLogin}
              style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}
            >
              Login
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
              <button onClick={() => setActiveTab('nuovoRitiro')} style={{ padding: '10px', backgroundColor: activeTab === 'nuovoRitiro' ? '#007BFF' : '#ccc', color: '#fff', border: 'none', borderRadius: '4px' }}>Nuovo Ritiro</button>
              <button onClick={() => setActiveTab('documenti')} style={{ padding: '10px', backgroundColor: activeTab === 'documenti' ? '#007BFF' : '#ccc', color: '#fff', border: 'none', borderRadius: '4px' }}>Documenti</button>
            </div>
            <p style={{ textAlign: 'center', color: '#888' }}>Benvenuto! Puoi gestire le richieste di ritiro toner e i documenti.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);