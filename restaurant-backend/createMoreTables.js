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

const createMoreTables = async () => {
  try {
    // Get current table count
    const currentCount = await Table.countDocuments();
    console.log(`📊 Current table count: ${currentCount}`);
    
    if (currentCount >= 30) {
      console.log('⚠️ Already at maximum table limit (30)');
      return;
    }
    
    // Create additional tables up to 25 total for demonstration
    const targetCount = Math.min(25, 30);
    const tablesToCreate = targetCount - currentCount;
    
    if (tablesToCreate <= 0) {
      console.log('✅ No additional tables needed');
      return;
    }
    
    const newTables = [];
    const chairCounts = [2, 4, 6, 8];
    const statuses = ['available', 'reserved'];
    const tableNames = [
      'VIP Section', 'Outdoor Patio', 'Balcony View', 'Fireplace Table',
      'Chef\'s Table', 'Wine Corner', 'Business Table', 'Date Night',
      'Group Dining', 'Express Table'
    ];
    
    for (let i = currentCount + 1; i <= targetCount; i++) {
      newTables.push({
        tableNumber: i,
        tableName: i <= currentCount + tableNames.length ? 
          tableNames[(i - currentCount - 1) % tableNames.length] : 
          `Table ${i}`,
        chairCount: chairCounts[Math.floor(Math.random() * chairCounts.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)]
      });
    }
    
    await Table.insertMany(newTables);
    console.log(`✅ Created ${newTables.length} additional tables`);
    
    // Display all tables
    const allTables = await Table.find().sort({ tableNumber: 1 });
    console.log(`\n📋 Total Tables: ${allTables.length}/30`);
    
    // Show grid layout preview
    console.log('\n🏗️ Grid Layout Preview (6x5):');
    for (let row = 0; row < 5; row++) {
      let rowStr = '';
      for (let col = 0; col < 6; col++) {
        const tableIndex = row * 6 + col;
        if (tableIndex < allTables.length) {
          const table = allTables[tableIndex];
          const status = table.status === 'reserved' ? 'R' : 'A';
          rowStr += `[${table.tableNumber.toString().padStart(2, '0')}${status}] `;
        } else {
          rowStr += '[--] ';
        }
      }
      console.log(rowStr);
    }
    console.log('\nLegend: A=Available, R=Reserved, --=Empty');
    
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
};

const main = async () => {
  await connectDB();
  await createMoreTables();
  process.exit(0);
};

main();