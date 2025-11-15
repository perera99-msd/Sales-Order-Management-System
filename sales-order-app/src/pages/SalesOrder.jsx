import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SalesOrderForm from '../components/SalesOrderForm';
import { useOrders } from '../hooks/useOrders';
import Button from '../components/ui/Button'; 

const SalesOrder = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const { 
    selectedOrder, 
    saveOrder, 
    clearSelectedOrder 
  } = useOrders();

  const handleSaveOrder = async (orderData) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      await saveOrder(orderData);
      clearSelectedOrder();
      navigate('/'); 
    } catch (err) {
      console.error('Failed to save order:', err);
      setSaveError(err.message || 'An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    clearSelectedOrder();
    navigate('/');
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 py-8 md:p-8">
      <div className="mb-4">
        <Button
          variant="secondary"
          onClick={handleCancel}
          className="bg-transparent text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Orders
        </Button>
      </div>

      <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white">
        {selectedOrder ? `Edit Sales Order` : 'New Sales Order'}
      </h1>

      {saveError && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Save Failed</h3>
          <p className="mt-2 text-sm text-red-700 dark:text-red-400">{saveError}</p>
        </div>
      )}

      <SalesOrderForm
        orderToEdit={selectedOrder}
        onSave={handleSaveOrder}
        isSaving={isSaving} 
      />
    </div>
  );
};

export default SalesOrder;