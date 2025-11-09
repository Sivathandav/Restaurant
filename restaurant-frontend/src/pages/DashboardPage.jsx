import React, { useState } from 'react';
import { Search } from 'lucide-react';
import AnalyticsCards from '../components/Dashboard/AnalyticsCards';
import RevenueChart from '../components/Dashboard/RevenueChart';
import OrderSummaryPieChart from '../components/Dashboard/OrderSummaryPieChart';
import TablesGrid from '../components/Dashboard/TablesGrid';
import ChefStats from '../components/Dashboard/ChefStats';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="dashboard-page">
      <div className="filter-bar-container">
        <div className="search-bar-top">
          <Search size={20} />
          <input
            type="text"
            placeholder="Filter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <main className="dashboard-content">
        <div className="analytics-frame">
          <h1 className="analytics-title">Analytics</h1>
          
          <AnalyticsCards searchTerm={searchTerm} />
          
          <div className="analytics-row">
            <section className={`panel ${searchTerm && !'order summary'.includes(searchTerm.toLowerCase()) ? 'dimmed' : ''}`}>
              <OrderSummaryPieChart />
            </section>
            <section className={`panel ${searchTerm && !'revenue'.includes(searchTerm.toLowerCase()) ? 'dimmed' : ''}`}>
              <RevenueChart />
            </section>
            <section className={`panel ${searchTerm && !'tables'.includes(searchTerm.toLowerCase()) ? 'dimmed' : ''}`}>
              <TablesGrid />
            </section>
          </div>
          
          <section className={`panel ${searchTerm && !'chef'.includes(searchTerm.toLowerCase()) ? 'dimmed' : ''}`}>
            <ChefStats />
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;