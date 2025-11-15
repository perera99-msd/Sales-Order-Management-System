import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerService } from '../services/customerService';

export const useCustomers = () => {
  const dispatch = useDispatch();
  const { items, selectedCustomer, loading, error } = useSelector((state) => state.customers);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        dispatch({ type: 'customers/setLoading', payload: true });
        const response = await customerService.getAll();
        console.log('📋 Customers fetched:', response.data); // Debug log
        dispatch({ type: 'customers/setItems', payload: response.data });
      } catch (error) {
        console.error('❌ Error fetching customers:', error);
        dispatch({ type: 'customers/setError', payload: error.message });
      } finally {
        dispatch({ type: 'customers/setLoading', payload: false });
      }
    };

    fetchCustomers();
  }, [dispatch]);

  const selectCustomer = (customerId) => {
    const customer = items.find(c => c.id === parseInt(customerId));
    console.log('👤 Selected customer:', customer); // Debug log
    dispatch({ type: 'customers/setSelectedCustomer', payload: customer });
  };

  return {
    customers: items,
    selectedCustomer,
    loading,
    error,
    selectCustomer,
  };
};