import React, { useState } from 'react';

export default function Items({
  items, onEdit, onMarkRetrieved, onDelete,
  search, setSearch, editId, editStatus,
  setEditStatus, handleEditSubmit, setEditId, user
}) {
  const [showHistoryId, setShowHistoryId] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchHistory = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/items/${id}/history`);
      const data = await res.json();
      setHistory(data);
      setShowHistoryId(showHistoryId === id ? null : id);
    } catch (error) {
      console.error('Error fetching history:', error);
      setHistory([]);
    }
  };

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tab-content">
      <h2><i className="fas fa-box-open" style={{ marginRight: '8px' }}></i>All Items</h2>
      <div style={{ position: 'relative', width: '100%', maxWidth: '750px' }}>
        <i className="fas fa-search" style={{
          position: 'absolute', top: '30%', left: '90px',
          transform: 'translateY(-50%)', color: '#6b7280'
        }}></i>
        <input
          className="search"
          style={{ paddingLeft: '3.5rem' }}
          placeholder="Search items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="item-list">
        {filtered.length === 0 && <p>No items found.</p>}
        {filtered.map(item => (
          <div className="item-card" key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Status: <b>{item.status}</b></p>
            <p>Reporter: {item.reporter}</p>
            <p>Date: {item.date}</p>

            <div className="actions">
              {user?.role === 'ADMIN' && item.status !== 'retrieved' && (
                <>
                  <button onClick={() => onEdit(item.id, item.status)}>
                    <i className="fas fa-edit" style={{ marginRight: '6px' }}></i> Update Status
                  </button>
                  <button onClick={() => onMarkRetrieved(item.id)}>
                    <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i> Mark as Retrieved
                  </button>
                </>
              )}
              {user?.role === 'ADMIN' && (
                <button onClick={() => onDelete(item.id)}>
                  <i className="fas fa-trash-alt" style={{ marginRight: '6px' }}></i> Delete
                </button>
              )}
              <button onClick={() => fetchHistory(item.id)}>
                <i className="fas fa-history" style={{ marginRight: '6px' }}></i> 
                {showHistoryId === item.id ? 'Hide History' : 'View History'}
              </button>
            </div>

            {editId === item.id && (
              <form className="edit-form" onSubmit={handleEditSubmit}>
                <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                  <option value="retrieved">Retrieved</option>
                </select>
                <button type="submit">
                  <i className="fas fa-save" style={{ marginRight: '6px' }}></i> Save
                </button>
                <button type="button" onClick={() => setEditId(null)}>
                  <i className="fas fa-times" style={{ marginRight: '6px' }}></i> Cancel
                </button>
              </form>
            )}

            {showHistoryId === item.id && (
              <div className="item-history">
                <h4><i className="fas fa-stream" style={{ marginRight: '6px' }}></i>History Log</h4>
                {history.length === 0 ? (
                  <p>No history found for this item.</p>
                ) : (
                  <ul>
                    {history.map((entry, index) => (
                      <li key={index}>
                        <b>{entry.timestamp}</b>: {entry.action}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}