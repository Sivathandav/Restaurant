import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableCard from '../components/Tables/TableCard';
import CreateTableModal from '../components/Tables/CreateTableModal';
import { getAllTables, createTable, deleteTable } from '../services/api';
import { Plus } from 'lucide-react';
import '../styles/Tables.css';

const TablesPage = () => {
  const [tables, setTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createAtIndex, setCreateAtIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTables();
  }, []);

  // Keyboard shortcut for creating tables
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '+' && tables.length < 30) {
        setCreateAtIndex(0);
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
      setCreateAtIndex(null);
      alert('Table created successfully!');
    } catch (error) {
      console.error('Error creating table:', error);
      alert('Failed to create table');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCreateAtIndex(null);
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

  if (loading) return <div className="loading">Loading...</div>;

  const nextTableNumber = tables.length + 1;

  return (
    <div className="tables-page">
      <main className="tables-content">
        <h1 className="page-title-simple">Tables</h1>
        
        <DndProvider backend={HTML5Backend}>
          <div className="tables-grid-6x5">
            {tables.map((table, index) => (
              <TableCard
                key={table._id}
                table={table}
                index={index}
                onDelete={handleDeleteTable}
                moveTable={moveTable}
              />
            ))}
            {/* Show empty slots for remaining spaces */}
            {Array.from({ length: Math.max(0, 30 - tables.length) }, (_, index) => {
              const shouldShowCreateCard = isModalOpen && createAtIndex === index;
              
              if (shouldShowCreateCard) {
                return (
                  <CreateTableModal
                    key={`create-${index}`}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onCreate={handleCreateTable}
                    nextTableNumber={nextTableNumber}
                  />
                );
              }
              
              return (
                <div 
                  key={`empty-${index}`} 
                  className={`empty-table-slot ${index === 0 && tables.length < 30 ? 'clickable' : ''}`}
                  onClick={() => {
                    if (index === 0 && tables.length < 30) {
                      setCreateAtIndex(index);
                      setIsModalOpen(true);
                    }
                  }}
                >
                  <span className="slot-number">#{tables.length + index + 1}</span>
                  {index === 0 && tables.length < 30 && (
                    <div className="add-icon">
                      <Plus size={24} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </DndProvider>
      </main>
    </div>
  );
};

export default TablesPage;