import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBlCy35naWma28qIqeVkk9XjUg1plYD8nI",
  authDomain: "portale-toner.firebaseapp.com",
  projectId: "portale-toner",
  storageBucket: "portale-toner.firebasestorage.app",
  messagingSenderId: "851513228930",
  appId: "1:851513228930:web:12038b1f9be3f9c9823e9b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setIsAdmin(user.email === 'admin@portale.com');
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });
  }, []);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registrazione completata. Controlla la tua email per confermare l\'account.');
      setIsRegistering(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Credenziali non valide o utente non registrato.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <nav style={{ backgroundColor: '#007BFF', padding: '10px 20px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Portale Toner</h1>
        {isLoggedIn && <button onClick={handleLogout} style={{ backgroundColor: '#ff4d4d', border: 'none', padding: '8px 12px', color: '#fff', borderRadius: '4px' }}>Logout</button>}
      </nav>

      <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '40px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {!isLoggedIn ? (
          isRegistering ? (
            <div>
              <h2 style={{ textAlign: 'center' }}>Registrati</h2>
              <label>Nome Azienda</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
              <button onClick={handleRegister} style={{ width: '100%', padding: '10px', backgroundColor: '#28A745', color: '#fff' }}>Registrati</button>
              <button onClick={() => setIsRegistering(false)} style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: '#ccc' }}>Torna al login</button>
            </div>
          ) : (
            <div>
              <h2 style={{ textAlign: 'center' }}>Accedi</h2>
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
              <button onClick={handleLogin} style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff' }}>Login</button>
              <button onClick={() => setIsRegistering(true)} style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: '#ccc' }}>Registrati</button>
            </div>
          )
        ) : isAdmin ? (
          <div>
            <h2 style={{ textAlign: 'center' }}>Pannello Admin</h2>
            <p>Gestisci richieste e documenti.</p>
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>Benvenuto! Puoi gestire le richieste di ritiro toner e i documenti.</p>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
