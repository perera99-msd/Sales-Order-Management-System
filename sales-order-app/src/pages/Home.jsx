import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders'; 
import OrderList from '../components/OrderList';

const Home = () => {
  const navigate = useNavigate();
  
  const { 
    orders, 
    loading, 
    error, 
    selectOrder, 
    clearSelectedOrder,
    refreshOrders 
  } = useOrders();

  useEffect(() => {
    refreshOrders();
    clearSelectedOrder();
  }, []); 

  const handleAddNew = () => {
    navigate('/sales-order'); 
  };

  const handleOrderSelect = (order) => {
    selectOrder(order);
    navigate('/sales-order');
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 py-8 md:p-8">
      {/* This h1 now correctly inherits its color from the Layout component,
        but we add an explicit color to be safe.
      */}
      <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white">
        Home
      </h1>
      <OrderList
        orders={orders}
        loading={loading}
        error={error}
        onAddNew={handleAddNew}
        onOrderSelect={handleOrderSelect}
      />
    </div>
  );
};

export default Home;