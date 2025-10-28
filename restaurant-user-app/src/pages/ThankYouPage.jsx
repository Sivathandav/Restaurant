import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import '../styles/ThankYou.css';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="thank-you-page">
      <div className="thank-you-content">
        <div className="success-circle">
          <CheckCircle size={60} className="success-icon" />
        </div>
        <h1>Thanks For Ordering</h1>
        <p>Your order has been placed successfully</p>
        <div className="countdown">
          <p>Redirecting in {countdown}</p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;