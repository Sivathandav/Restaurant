import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '../components/Dashboard/Header';
import TableCard from '../components/Tables/TableCard';
import CreateTableModal from '../components/Tables/CreateTableModal';
import { getAllTables, createTable, deleteTable } from '../services/api';
import { Plus } from 'lucide-react';
import '../styles/Tables.css';

const TablesPage = () => {
  const [tables, setTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTables();
  }, []);

  // Keyboard shortcut for creating tables
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '+' && tables.length < 30) {
        setIsModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [tables.length]);

  const fetchTables = async () => {
    try {
      const response = await getAllTables();
      setTables(response.data.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTable = async (data) => {
    if (tables.length >= 30) {
      alert('Maximum of 30 tables allowed. Cannot create more tables.');
      return;
    }
    
    try {
      await createTable(data);
      fetchTables();
      setIsModalOpen(false);
      alert('Table created successfully!');
    } catch (error) {
      console.error('Error creating table:', error);
      alert('Failed to create table');
    }
  };

  const handleDeleteTable = async (id) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      try {
        await deleteTable(id);
        fetchTables();
        alert('Table deleted successfully!');
      } catch (error) {
        console.error('Error deleting table:', error);
        alert(error.response?.data?.message || 'Failed to delete table');
      }
    }
  };

  const moveTable = (fromIndex, toIndex) => {
    const updatedTables = [...tables];
    const [movedTable] = updatedTables.splice(fromIndex, 1);
    updatedTables.splice(toIndex, 0, movedTable);
    setTables(updatedTables);
  };

  const filteredTables = tables.filter(table => 
    searchTerm === '' || 
    table.tableNumber.toString().includes(searchTerm) ||
    table.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="tables-page">
      <Header onSearch={setSearchTerm} title="Tables" />
      
      <main className="tables-content">
        {/* Table Counter */}
        <div className="table-counter">
          {tables.length}/30 Tables
        </div>
        
        <DndProvider backend={HTML5Backend}>
          <div className="tables-grid-6x5">
            {filteredTables.map((table, index) => (
              <TableCard
                key={table._id}
                table={table}
                index={index}
                onDelete={handleDeleteTable}
                moveTable={moveTable}
                isBlurred={searchTerm !== '' && !table.tableNumber.toString().includes(searchTerm) && !table.status.toLowerCase().includes(searchTerm.toLowerCase())}
              />
            ))}
            {/* Show empty slots for remaining spaces */}
            {searchTerm === '' && Array.from({ length: Math.max(0, 30 - tables.length) }, (_, index) => (
              <div 
                key={`empty-${index}`} 
                className={`empty-table-slot ${index === 0 && tables.length < 30 ? 'clickable' : ''}`}
                onClick={() => index === 0 && tables.length < 30 && setIsModalOpen(true)}
              >
                <span className="slot-number">#{tables.length + index + 1}</span>
                {index === 0 && tables.length < 30 && (
                  <div className="add-icon">
                    <Plus size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </DndProvider>
      </main>



      <CreateTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTable}
      />
    </div>
  );
};

export default TablesPage;