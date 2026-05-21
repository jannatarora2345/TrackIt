import React from 'react';

export default function Report({ form, setForm, handleSubmit }) {
  return (
    <div className="tab-content">
      <h2><i className="fas fa-clipboard-list" style={{ marginRight: '8px' }}></i>Report Lost/Found Item</h2>
      <div style={{ 
        backgroundColor: '#f8fafc', 
        padding: '1rem', 
        borderRadius: '8px',
        marginBottom: '1rem',
        border: '1px solid #e2e8f0'
      }}>
        <p><strong>Instructions:</strong></p>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
          <li>Fill in all required fields below</li>
          <li>Select "Lost" if you lost an item</li>
          <li>Select "Found" if you found an item</li>
          <li>Provide a detailed description to help identify the item</li>
        </ul>
      </div>
      
      <form className="item-form" onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            <i className="fas fa-tag" style={{ marginRight: '6px' }}></i>Item Name *
          </label>
          <input
            required
            placeholder="e.g., iPhone 13, Black Backpack, etc."
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            <i className="fas fa-align-left" style={{ marginRight: '6px' }}></i>Description *
          </label>
          <textarea
            required
            placeholder="Describe the item in detail (color, brand, distinctive features, etc.)"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows="3"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', resize: 'vertical' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            <i className="fas fa-exclamation-triangle" style={{ marginRight: '6px' }}></i>Status *
          </label>
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
          >
            <option value="lost">🔍 Lost - I lost this item</option>
            <option value="found">📦 Found - I found this item</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            <i className="fas fa-user" style={{ marginRight: '6px' }}></i>Your Name *
          </label>
          <input
            required
            placeholder="Enter your full name"
            value={form.reporter}
            onChange={e => setForm({ ...form, reporter: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </div>

        <button 
          type="submit"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            width: '100%'
          }}
        >
          <i className="fas fa-plus-circle" style={{ marginRight: '8px' }}></i> Report Item
        </button>
      </form>
    </div>
  );
}