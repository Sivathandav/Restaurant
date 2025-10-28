const mongoose = require('mongoose');
const Table = require('./src/models/Table');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const createSampleTables = async () => {
  try {
    // Clear existing tables
    await Table.deleteMany({});
    console.log('🗑️ Cleared existing tables');

    // Create 15 sample tables to test the layout
    const sampleTables = [];
    
    for (let i = 1; i <= 15; i++) {
      const chairCounts = [2, 4, 6, 8];
      const statuses = ['available', 'reserved'];
      const tableNames = [
        'Window Side', 'Corner Table', 'Garden View', 'Private Booth', 
        'Bar Side', 'Center Hall', 'Quiet Corner', 'Family Table'
      ];
      
      sampleTables.push({
        tableNumber: i,
        tableName: i <= 8 ? tableNames[i - 1] : `Table ${i}`,
        chairCount: chairCounts[Math.floor(Math.random() * chairCounts.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)]
      });
    }

    await Table.insertMany(sampleTables);
    console.log(`✅ Created ${sampleTables.length} sample tables`);
    
    // Display the created tables
    const tables = await Table.find().sort({ tableNumber: 1 });
    console.log('\n📋 Created Tables:');
    tables.forEach(table => {
      console.log(`Table ${table.tableNumber}: ${table.tableName} (${table.chairCount} chairs) - ${table.status}`);
    });
    
  } catch (error) {
    console.error('❌ Error creating sample tables:', error);
  }
};

const main = async () => {
  await connectDB();
  await createSampleTables();
  process.exit(0);
};

main();