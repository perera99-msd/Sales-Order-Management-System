import { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getAll();
      setOrders(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Save order to backend
  const saveOrder = async (orderData) => {
    try {
      setLoading(true);
      let savedOrder;
      
      if (orderData.id) {
        // Update existing order
        const response = await orderService.update(orderData.id, orderData);
        savedOrder = response.data;
        setOrders(orders.map(order => 
          order.id === savedOrder.id ? savedOrder : order
        ));
      } else {
        // Create new order
        const response = await orderService.create(orderData);
        savedOrder = response.data;
        setOrders([...orders, savedOrder]);
      }
      
      return savedOrder;
    } catch (err) {
      setError(err.message);
      console.error('Error saving order:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const selectOrder = (order) => {
    setSelectedOrder(order);
  };

  const clearSelectedOrder = () => {
    setSelectedOrder(null);
  };

  const refreshOrders = () => {
    fetchOrders();
  };

  return {
    orders,
    selectedOrder,
    loading,
    error,
    saveOrder,
    selectOrder,
    clearSelectedOrder,
    refreshOrders,
  };
};