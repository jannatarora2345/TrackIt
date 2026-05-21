import React, { useEffect, useState } from 'react';

export default function HistoryTab() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4000/api/items/history');
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        setLogs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load history. Please try again.');
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const refreshHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/items/history');
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      const data = await response.json();
      setLogs(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching history:', err);
      setError('Failed to load history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tab-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2><i className="fas fa-history" style={{ marginRight: '8px' }}></i>All Item History</h2>
        <button 
          onClick={refreshHistory}
          disabled={loading}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          <i className="fas fa-sync-alt" style={{ marginRight: '6px' }}></i>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {loading && <p>Loading history...</p>}
      
      {error && (
        <div style={{ 
          backgroundColor: '#fee2e2', 
          color: '#dc2626', 
          padding: '1rem', 
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {!loading && !error && logs.length === 0 && (
        <p>No history records found.</p>
      )}

      {!loading && !error && logs.length > 0 && (
        <div className="history-container">
          <div style={{ 
            backgroundColor: '#f8fafc', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #e2e8f0'
          }}>
            <p><strong>Total Records:</strong> {logs.length}</p>
            <p><strong>Last Updated:</strong> {new Date().toLocaleString()}</p>
          </div>
          
          <ul className="item-history" style={{ listStyle: 'none', padding: 0 }}>
            {logs.map((entry, index) => (
              <li key={index} style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
                      <i className="fas fa-box" style={{ marginRight: '6px', color: '#3b82f6' }}></i>
                      {entry.itemName} (ID: #{entry.itemId})
                    </div>
                    <div style={{ color: '#374151', marginBottom: '4px' }}>
                      {entry.action}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {entry.reporterName && (
                        <span>
                          <i className="fas fa-user" style={{ marginRight: '4px' }}></i>
                          Reporter: {entry.reporterName}
                        </span>
                      )}
                      {entry.retrieverName && (
                        <span style={{ marginLeft: '12px' }}>
                          <i className="fas fa-hand-holding" style={{ marginRight: '4px' }}></i>
                          Retriever: {entry.retrieverName}
                        </span>
                      )}
                      {entry.performedBy && (
                        <span style={{ marginLeft: '12px' }}>
                          <i className="fas fa-user-cog" style={{ marginRight: '4px' }}></i>
                          Performed by: {entry.performedBy}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem', textAlign: 'right' }}>
                    {entry.timestamp}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}