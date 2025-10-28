import React, { useState } from 'react';
import Header from '../components/Dashboard/Header';
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
      <Header onSearch={setSearchTerm} title="Analytics" />
      
      <main className="dashboard-content">
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
      </main>
    </div>
  );
};

export default DashboardPage;