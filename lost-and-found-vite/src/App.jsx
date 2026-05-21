// import { useState, useEffect } from 'react';
// import './App.css';
// import LoginSignup from './LoginSignup';
// import ItemPage from './ItemPage';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// function Home() {
//   return (
//     <div className="tab-content">
//       <h2><i className="fas fa-home" style={{ marginRight: '8px' }}></i>Welcome to TrackIt</h2>
//       <p>This is the campus lost and found portal. Use the tabs to view, report, or search for items.</p>
//     </div>
//   );
// }

// function App(){
//   const [loggedIn , setLoggedIn] = useState(false);
//   return (
//     <>
//     {loggedIn ? <ItemPage/> : <LoginSignup onLogin={() => setLoggedIn(true)} />}
//       </>
//   );
// }
// function Items({
//   items, onEdit, onMarkRetrieved, onDelete,
//   search, setSearch, editId, editStatus,
//   setEditStatus, handleEditSubmit, setEditId
// }) {
//   const [showHistoryId, setShowHistoryId] = useState(null);
//   const [history, setHistory] = useState([]);

//   const fetchHistory = async (id) => {
//     const res = await fetch(`http://localhost:4000/api/items/${id}/history`);
//     const data = await res.json();
//     setHistory(data);
//     setShowHistoryId(id);
//   };

//   const filtered = items.filter(item =>
//     item.name.toLowerCase().includes(search.toLowerCase()) ||
//     item.description.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="tab-content">
//       <h2><i className="fas fa-box-open" style={{ marginRight: '8px' }}></i>All Items</h2>
//       <div style={{ position: 'relative', width: '100%', maxWidth: '750px' }}>
//         <i className="fas fa-search" style={{
//           position: 'absolute', top: '30%', left: '90px',
//           transform: 'translateY(-50%)', color: '#6b7280'
//         }}></i>
//         <input
//           className="search"
//           style={{ paddingLeft: '3.5rem' }}
//           placeholder="Search items..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="item-list">
//         {filtered.length === 0 && <p>No items found.</p>}
//         {filtered.map(item => (
//           <div className="item-card" key={item.id}>
//             <h3>{item.name}</h3>
//             <p>{item.description}</p>
//             <p>Status: <b>{item.status}</b></p>
//             <p>Reporter: {item.reporter}</p>
//             <p>Date: {item.date}</p>

//             <div className="actions">
//               {item.status !== 'retrieved' && (
//                 <>
//                   <button onClick={() => onEdit(item.id, item.status)}>
//                     <i className="fas fa-edit" style={{ marginRight: '6px' }}></i> Update Status
//                   </button>
//                   <button onClick={() => onMarkRetrieved(item.id)}>
//                     <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i> Mark as Retrieved
//                   </button>
//                 </>
//               )}
//               <button onClick={() => onDelete(item.id)}>
//                 <i className="fas fa-trash-alt" style={{ marginRight: '6px' }}></i> Delete
//               </button>
//               <button onClick={() => fetchHistory(item.id)}>
//                 <i className="fas fa-history" style={{ marginRight: '6px' }}></i> View History
//               </button>
//             </div>

//             {editId === item.id && (
//               <form className="edit-form" onSubmit={handleEditSubmit}>
//                 <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
//                   <option value="lost">Lost</option>
//                   <option value="found">Found</option>
//                   <option value="retrieved">Retrieved</option>
//                 </select>
//                 <button type="submit">
//                   <i className="fas fa-save" style={{ marginRight: '6px' }}></i> Save
//                 </button>
//                 <button type="button" onClick={() => setEditId(null)}>
//                   <i className="fas fa-times" style={{ marginRight: '6px' }}></i> Cancel
//                 </button>
//               </form>
//             )}

//             {showHistoryId === item.id && (
//               <div className="item-history">
//                 <h4><i className="fas fa-stream" style={{ marginRight: '6px' }}></i>History Log</h4>
//                 <ul>
//                   {history.map((entry, index) => (
//                     <li key={index}>
//                       <b>{entry.timestamp}</b>: {entry.action}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function Report({ form, setForm, handleSubmit }) {
//   return (
//     <div className="tab-content">
//       <h2><i className="fas fa-clipboard-list" style={{ marginRight: '8px' }}></i>Report Lost/Found Item</h2>
//       <form className="item-form" onSubmit={handleSubmit}>
//         <input
//           required
//           placeholder="Item Name"
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           required
//           placeholder="Description"
//           value={form.description}
//           onChange={e => setForm({ ...form, description: e.target.value })}
//         />
//         <select
//           value={form.status}
//           onChange={e => setForm({ ...form, status: e.target.value })}
//         >
//           <option value="lost">Lost</option>
//           <option value="found">Found</option>
//         </select>
//         <input
//           required
//           placeholder="Your Name"
//           value={form.reporter}
//           onChange={e => setForm({ ...form, reporter: e.target.value })}
//         />
//         <button type="submit">
//           <i className="fas fa-plus-circle" style={{ marginRight: '8px' }}></i> Report Item
//         </button>
//       </form>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div className="tab-content">
//       <h2><i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>About TrackIt</h2>
//       <p>TrackIt is a campus lost and found system. Report, search, and retrieve lost or found items easily.</p>
//       <h3>Contact</h3>
//       <p><i className="fas fa-envelope" style={{ marginRight: '6px' }}></i> Email: support@trackit-campus.com</p>
//       <p><i className="fas fa-phone" style={{ marginRight: '6px' }}></i> Phone: +91-12345-67890</p>
//     </div>
//   );
// }

// function HistoryTab() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:4000/api/items/history')
//       .then(res => res.json())
//       .then(data => {
//         console.log("Fetched history:", data);
//         setLogs(data);
//       })
//       .catch(err => {
//         console.error("Error fetching history:", err);
//         setLogs([]);
//       });
//   }, []);

//   return (
//     <div className="tab-content">
//       <h2><i className="fas fa-history" style={{ marginRight: '8px' }}></i>All Item History</h2>
//       {logs.length === 0 ? (
//         <p>No history records found.</p>
//       ) : (
//         <ul className="item-history">
//           {logs.map((entry, index) => (
//             <li key={index}>
//               <b>Item #{entry.itemId}</b> — {entry.action} on <b>{entry.timestamp}</b>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


// function App() {
//   const [items, setItems] = useState([]);
//   const [form, setForm] = useState({ name: '', description: '', status: 'lost', reporter: '' });
//   const [search, setSearch] = useState('');
//   const [editId, setEditId] = useState(null);
//   const [editStatus, setEditStatus] = useState('lost');
//   const API_URL = 'http://localhost:4000/api/items/';

//   useEffect(() => {
//     fetch(API_URL)
//       .then(res => res.json())
//       .then(data => setItems(data))
//       .catch(() => setItems([]));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newItem = {
//       ...form,
//       date: new Date().toISOString().slice(0, 10),
//     };
//     const res = await fetch(API_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newItem),
//     });
//     const data = await res.json();
//     setItems([data, ...items]);
//     setForm({ name: '', description: '', status: 'lost', reporter: '' });
//   };

//   const onEdit = (id, status) => {
//     setEditId(id);
//     setEditStatus(status);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch(`${API_URL}${editId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: editStatus }),
//     });
//     const data = await res.json();
//     setItems(items.map(item => item.id === editId ? data : item));
//     setEditId(null);
//     setEditStatus('lost');
//   };

//   const onMarkRetrieved = async (id) => {
//     const res = await fetch(`${API_URL}${id}/retrieved`, { method: 'PUT' });
//     const data = await res.json();
//     setItems(items.map(item => item.id === id ? data : item));
//   };

//   const onDelete = async (id) => {
//     await fetch(`${API_URL}${id}`, { method: 'DELETE' });
//     setItems(items.filter(item => item.id !== id));
//   };

//   return (
//     <Router>
//       <div className="container">
//         <div className="header-fixed">
//           <h1>🎒 TrackIt - Campus Lost & Found</h1>
//           <div className="navbar">
//             <nav className="tabs">
//               <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
//                 <i className="fas fa-home" style={{ marginRight: '6px' }}></i> Home
//               </NavLink>
//               <NavLink to="/items" className={({ isActive }) => isActive ? 'active' : ''}>
//                 <i className="fas fa-box-open" style={{ marginRight: '6px' }}></i> Items
//               </NavLink>
//               <NavLink to="/report" className={({ isActive }) => isActive ? 'active' : ''}>
//                 <i className="fas fa-clipboard-list" style={{ marginRight: '6px' }}></i> Report
//               </NavLink>
//               <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
//                 <i className="fas fa-info-circle" style={{ marginRight: '6px' }}></i> About
//               </NavLink>
//               <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>
//                 <i className="fas fa-history" style={{ marginRight: '6px' }}></i> History
//               </NavLink>
//             </nav>
//           </div>
//         </div>

//         <div className="main-content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/items" element={
//               <Items
//                 items={items}
//                 onEdit={onEdit}
//                 onMarkRetrieved={onMarkRetrieved}
//                 onDelete={onDelete}
//                 search={search}
//                 setSearch={setSearch}
//                 editId={editId}
//                 editStatus={editStatus}
//                 setEditStatus={setEditStatus}
//                 handleEditSubmit={handleEditSubmit}
//                 setEditId={setEditId}
//               />
//             } />
//             <Route path="/report" element={<Report form={form} setForm={setForm} handleSubmit={handleSubmit} />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/history" element={<HistoryTab />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import './App.css';
import LoginSignup from './LoginSignup';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Components
import Items from './Items';
import Report from './Report';
import About from './About';
import HistoryTab from './HistoryTab';

function Home() {
  return (
    <div className="tab-content">
      <h2><i className="fas fa-home" style={{ marginRight: '8px' }}></i>Welcome to TrackIt</h2>
      <p>This is the campus lost and found portal. Use the tabs to view, report, or search for items.</p>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', status: 'lost', reporter: '' });
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);
  const [editStatus, setEditStatus] = useState('lost');
  const API_URL = 'http://localhost:4000/api/items/';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setLoggedIn(true);
    }

    fetch(API_URL)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(() => setItems([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const newItem = {
      ...form,
      date: new Date().toISOString().slice(0, 10),
      token: token
    };
    
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      
      if (data.success) {
        setItems([data.item, ...items]);
        setForm({ name: '', description: '', status: 'lost', reporter: '' });
      } else {
        alert(data.message || 'Error adding item');
      }
    } catch (error) {
      alert('Error adding item');
    }
  };

  const onEdit = (id, status) => {
    setEditId(id);
    setEditStatus(status);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(`${API_URL}${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: editStatus, token: token }),
      });
      const data = await res.json();
      
      if (data.success) {
        setItems(items.map(item => item.id === editId ? data.item : item));
        setEditId(null);
        setEditStatus('lost');
      } else {
        alert(data.message || 'Error updating item');
      }
    } catch (error) {
      alert('Error updating item');
    }
  };

  const onMarkRetrieved = async (id) => {
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(`${API_URL}${id}/retrieved`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token })
      });
      const data = await res.json();
      
      if (data.success) {
        setItems(items.map(item => item.id === id ? data.item : item));
      } else {
        alert(data.message || 'Error marking item as retrieved');
      }
    } catch (error) {
      alert('Error marking item as retrieved');
    }
  };

  const onDelete = async (id) => {
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(`${API_URL}${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token })
      });
      const data = await res.json();
      
      if (data.success) {
        setItems(items.filter(item => item.id !== id));
      } else {
        alert(data.message || 'Error deleting item');
      }
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUser(null);
  };

  if (!loggedIn) {
    return (
      <LoginSignup onLogin={(userData) => {
        setUser(userData);
        setLoggedIn(true);
      }} />
    );
  }

  return (
    <Router>
      <div className="container">
        <div className="header-fixed">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h1>🎒 TrackIt - Campus Lost & Found</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                  Welcome, {user?.fullName || user?.username}!
                </div>
                <div style={{ fontSize: '0.8rem', color: user?.role === 'ADMIN' ? '#dc2626' : '#059669' }}>
                  <i className={`fas ${user?.role === 'ADMIN' ? 'fa-crown' : 'fa-user'}`} style={{ marginRight: '4px' }}></i>
                  {user?.role === 'ADMIN' ? 'Administrator' : 'User'}
                </div>
              </div>
              <button
                style={{
                  backgroundColor: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
          <div className="navbar">
            <nav className="tabs">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                <i className="fas fa-home" style={{ marginRight: '6px' }}></i> Home
              </NavLink>
              <NavLink to="/items" className={({ isActive }) => isActive ? 'active' : ''}>
                <i className="fas fa-box-open" style={{ marginRight: '6px' }}></i> Items
              </NavLink>
              <NavLink to="/report" className={({ isActive }) => isActive ? 'active' : ''}>
                <i className="fas fa-clipboard-list" style={{ marginRight: '6px' }}></i> Report
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                <i className="fas fa-info-circle" style={{ marginRight: '6px' }}></i> About
              </NavLink>
              <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>
                <i className="fas fa-history" style={{ marginRight: '6px' }}></i> History
              </NavLink>
            </nav>
          </div>
        </div>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={
              <Items
                items={items}
                onEdit={onEdit}
                onMarkRetrieved={onMarkRetrieved}
                onDelete={onDelete}
                search={search}
                setSearch={setSearch}
                editId={editId}
                editStatus={editStatus}
                setEditStatus={setEditStatus}
                handleEditSubmit={handleEditSubmit}
                setEditId={setEditId}
                user={user}
              />
            } />
            <Route path="/report" element={<Report form={form} setForm={setForm} handleSubmit={handleSubmit} />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<HistoryTab />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;