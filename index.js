import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState('');
  const [activeTab, setActiveTab] = useState('nuovoRitiro');
  const [users, setUsers] = useState([]);

  const handleRegister = () => {
    if (email && password && companyName) {
      setUsers([...users, { email, password, companyName }]);
      alert('Registrazione completata. Controlla la tua email per confermare l'account.');
      setIsRegistering(false);
    }
  };

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      if (email === 'admin@portale.com') {
        setIsAdmin(true);
      }
    } else {
      alert('Credenziali non valide o utente non registrato.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <nav style={{ backgroundColor: '#007BFF', padding: '10px 20px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Portale Toner</h1>
        {isLoggedIn && (
          <button onClick={() => { setIsLoggedIn(false); setIsAdmin(false); }} style={{ backgroundColor: '#ff4d4d', border: 'none', padding: '8px 12px', color: '#fff', borderRadius: '4px' }}>Logout</button>
        )}
      </nav>

      <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '40px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {!isLoggedIn ? (
          isRegistering ? (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Registrati</h2>
              <label>Nome Azienda</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid #ccc' }} />
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid #ccc' }} />
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius: '4px', border: '1px solid #ccc' }} />
              <button onClick={handleRegister} style={{ width: '100%', padding: '10px', backgroundColor: '#28A745', color: '#fff', border: 'none', borderRadius: '4px' }}>Registrati</button>
              <button onClick={() => setIsRegistering(false)} style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px' }}>Torna al login</button>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Accedi</h2>
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '4px', border: '1px solid #ccc' }} />
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '16px', borderRadius: '4px', border: '1px solid #ccc' }} />
              <button onClick={handleLogin} style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}>Login</button>
              <button onClick={() => setIsRegistering(true)} style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px' }}>Registrati</button>
            </div>
          )
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>Benvenuto! Puoi gestire le richieste di ritiro toner e i documenti.</p>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
