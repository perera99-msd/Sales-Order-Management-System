import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { useCustomers } from '../hooks/useCustomers';
import { useItems } from '../hooks/useItems';

const SalesOrderForm = ({ orderToEdit, onSave, isSaving }) => { 
  const { customers, selectCustomer, selectedCustomer } = useCustomers();
  const { items: allItems, loading: itemsLoading, error: itemsError } = useItems();

  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState({ line1: '', line2: '', line3: '', suburb: '', state: '', postCode: '' });
  const [invoiceDetails, setInvoiceDetails] = useState({ invoiceNo: '', invoiceDate: '', referenceNo: '', note: '' });
  
  const [items, setItems] = useState([{ 
    id: 1, 
    itemId: '',
    note: '', 
    qty: 0, 
    price: 0, 
    tax: 0
  }]);

  const [totals, setTotals] = useState({ totalExcl: 0, totalTax: 0, totalIncl: 0 });

  // Debug log to check items data
  useEffect(() => {
    console.log('🛒 Available items in form:', allItems);
    console.log('🔄 Items loading:', itemsLoading);
    console.log('❌ Items error:', itemsError);
  }, [allItems, itemsLoading, itemsError]);

  useEffect(() => {
    if (selectedCustomer) {
      setAddress({
        line1: selectedCustomer.addressLine1 || '',
        line2: selectedCustomer.addressLine2 || '',
        line3: selectedCustomer.addressLine3 || '',
        suburb: selectedCustomer.suburb || '',
        state: selectedCustomer.state || '',
        postCode: selectedCustomer.postCode || '',
      });
    }
  }, [selectedCustomer]);

  useEffect(() => {
    if (orderToEdit) {
      setCustomer(orderToEdit.customerId || '');
      if (orderToEdit.customerId) {
        selectCustomer(orderToEdit.customerId);
      }
      setAddress(orderToEdit.address || { line1: '', line2: '', line3: '', suburb: '', state: '', postCode: '' });
      setInvoiceDetails({
        invoiceNo: orderToEdit.invoiceNo || '',
        invoiceDate: orderToEdit.invoiceDate || '',
        referenceNo: orderToEdit.referenceNo || '',
        note: orderToEdit.note || ''
      });
      
      const transformedItems = orderToEdit.orderItems && orderToEdit.orderItems.length > 0 
        ? orderToEdit.orderItems.map(item => ({
            id: item.id,
            itemId: item.itemId,
            note: item.note || '',
            qty: item.quantity || 0,
            price: item.price || 0,
            tax: item.taxRate || 0,
          }))
        : [{ id: 1, itemId: '', note: '', qty: 0, price: 0, tax: 0 }];
      
      setItems(transformedItems);
    }
  }, [orderToEdit, selectCustomer]);

  useEffect(() => {
    let newTotalExcl = 0;
    let newTotalTax = 0;
    let newTotalIncl = 0;

    items.forEach((item) => {
      const qty = parseFloat(item.qty) || 0;
      const price = parseFloat(item.price) || 0;
      const tax = parseFloat(item.tax) || 0;
      const exclAmount = qty * price;
      const taxAmount = (exclAmount * tax) / 100;
      const inclAmount = exclAmount + taxAmount;
      newTotalExcl += exclAmount;
      newTotalTax += taxAmount;
      newTotalIncl += inclAmount;
    });
    
    setTotals({
      totalExcl: newTotalExcl,
      totalTax: newTotalTax,
      totalIncl: newTotalIncl,
    });
  }, [items]); 

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddRow = () => {
    setItems([...items, { 
      id: Date.now(),
      itemId: '',
      note: '', 
      qty: 0, 
      price: 0, 
      tax: 0
    }]);
  };

  const handleSaveClick = () => {
    if (!customer) { alert('Please select a customer'); return; }
    if (!invoiceDetails.invoiceNo) { alert('Please enter an invoice number'); return; }
    if (!invoiceDetails.invoiceDate) { alert('Please select an invoice date'); return; }

    const validItems = items.filter(item => item.itemId && item.qty > 0 && item.price >= 0);
    
    if (validItems.length === 0) {
      alert('Please add at least one valid item');
      return;
    }

    const orderData = {
      customerId: parseInt(customer),
      invoiceNo: invoiceDetails.invoiceNo.trim(),
      invoiceDate: invoiceDetails.invoiceDate,
      referenceNo: invoiceDetails.referenceNo ? invoiceDetails.referenceNo.trim() : null,
      note: invoiceDetails.note ? invoiceDetails.note.trim() : null,
      orderItems: validItems.map(item => ({
        itemId: parseInt(item.itemId),
        note: item.note ? item.note.trim() : null,
        quantity: parseInt(item.qty),
        price: parseFloat(parseFloat(item.price).toFixed(2)),
        taxRate: parseFloat(parseFloat(item.tax || 0).toFixed(2))
      }))
    };

    if (orderToEdit?.id) {
      orderData.id = parseInt(orderToEdit.id);
    }
    
    onSave(orderData);
  };

  const handleCustomerChange = (customerId) => {
    setCustomer(customerId);
    selectCustomer(customerId);
  };

  const handleItemSelect = (index, selectedItemId) => {
    const selectedItem = allItems.find(it => it.id === parseInt(selectedItemId));
    if (selectedItem) {
      const newItems = [...items];
      newItems[index] = {
        ...newItems[index],
        itemId: selectedItem.id,
        price: selectedItem.price
      };
      setItems(newItems);
    } else {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], itemId: '', price: 0 };
      setItems(newItems);
    }
  };

  const handleRemoveRow = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };
  
  const getItemDetails = (itemId) => {
    return allItems.find(it => it.id === parseInt(itemId)) || {};
  };

  // Show loading state while items are being fetched
  if (itemsLoading) {
    return (
      <div className="bg-white p-6 shadow-xl rounded-lg dark:bg-gray-800 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading items...</p>
        </div>
      </div>
    );
  }

  // Show error state if items failed to load
  if (itemsError) {
    return (
      <div className="bg-white p-6 shadow-xl rounded-lg dark:bg-gray-800">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p>Error loading items: {itemsError}</p>
          <Button 
            variant="secondary" 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-xl rounded-lg dark:bg-gray-800">
      <div className="flex justify-start mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
        <Button variant="success" onClick={handleSaveClick} disabled={isSaving}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {isSaving ? 'Saving...' : 'Save Order'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <Select
            label="Customer Name"
            id="customerName"
            value={customer}
            onChange={(e) => handleCustomerChange(e.target.value)}
          >
            <option value="">Select a customer</option>
            {customers.map(cust => (
              <option key={cust.id} value={cust.id}>
                {cust.name}
              </option>
            ))}
          </Select>
          <Input label="Address 1" id="address1" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
          <Input label="Address 2" id="address2" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} />
          <Input label="Address 3" id="address3" value={address.line3} onChange={(e) => setAddress({ ...address, line3: e.target.value })} />
          <Input label="Suburb" id="suburb" value={address.suburb} onChange={(e) => setAddress({ ...address, suburb: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="State" id="state" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
            <Input label="Post Code" id="postCode" value={address.postCode} onChange={(e) => setAddress({ ...address, postCode: e.target.value })} />
          </div>
        </div>

        <div>
          <Input label="Invoice No." id="invoiceNo" value={invoiceDetails.invoiceNo} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceNo: e.target.value })} placeholder="e.g., INV-001" />
          <Input label="Invoice Date" id="invoiceDate" type="date" value={invoiceDetails.invoiceDate} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceDate: e.target.value })} />
          <Input label="Reference No." id="referenceNo" value={invoiceDetails.referenceNo} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, referenceNo: e.target.value })} placeholder="e.g., PO-123" />
          <div className="mb-4">
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Note</label>
            <textarea
              id="note"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-blue-500 focus:border-blue-500
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={invoiceDetails.note}
              onChange={(e) => setInvoiceDetails({ ...invoiceDetails, note: e.target.value })}
              placeholder="Additional notes or instructions..."
            ></textarea>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border dark:divide-gray-700 dark:border-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Item Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Note</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Quantity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Tax %</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Excl Amount</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Tax Amount</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Incl Amount</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {items.map((item, index) => {
              const selectedItem = getItemDetails(item.itemId);
              const qty = parseFloat(item.qty) || 0;
              const price = parseFloat(item.price) || 0;
              const tax = parseFloat(item.tax) || 0;
              const exclAmount = qty * price;
              const taxAmount = (exclAmount * tax) / 100;
              const inclAmount = exclAmount + taxAmount;

              return (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-1 py-1 w-36">
                    <Select 
                      value={item.itemId} 
                      onChange={(e) => handleItemSelect(index, e.target.value)}
                    >
                      <option value="">Select Item Code</option>
                      {allItems.map(i => (
                        <option key={i.id} value={i.id}>
                          {i.itemCode} - ${i.price}
                        </option>
                      ))}
                    </Select>
                  </td>
                  <td className="px-1 py-1 w-48">
                    <Input 
                      value={selectedItem.description || ''} 
                      readOnly 
                      placeholder="Item description"
                    />
                  </td>
                  <td className="px-1 py-1 w-36">
                    <Input 
                      type="text" 
                      value={item.note} 
                      onChange={(e) => handleItemChange(index, 'note', e.target.value)} 
                      placeholder="Item note..."
                    />
                  </td>
                  <td className="px-1 py-1 w-24">
                    <Input 
                      type="number" 
                      value={item.qty} 
                      onChange={(e) => handleItemChange(index, 'qty', e.target.value)} 
                      min="1" 
                      className="text-right"
                    />
                  </td>
                  <td className="px-1 py-1 w-24">
                    <Input 
                      type="number" 
                      value={item.price} 
                      onChange={(e) => handleItemChange(index, 'price', e.target.value)} 
                      step="0.01" 
                      min="0" 
                      className="text-right"
                    />
                  </td>
                  <td className="px-1 py-1 w-20">
                    <Input 
                      type="number" 
                      value={item.tax} 
                      onChange={(e) => handleItemChange(index, 'tax', e.target.value)} 
                      step="0.01" 
                      min="0" 
                      max="100" 
                      className="text-right"
                    />
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300 w-32">
                    ${exclAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300 w-32">
                    ${taxAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-900 dark:text-white font-medium w-32">
                    ${inclAmount.toFixed(2)}
                  </td>
                  <td className="px-2 py-2 text-center w-16">
                    {items.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => handleRemoveRow(index)} 
                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 dark:hover:bg-gray-700" 
                        title="Remove row"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="flex gap-4 mt-4">
        <Button variant="secondary" onClick={handleAddRow}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Row
        </Button>
      </div>

      <div className="flex justify-end mt-8">
        <div className="w-full max-w-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Excl</label>
            <Input readOnly value={`$${totals.totalExcl.toFixed(2)}`} className="w-2/3 text-right font-bold" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Tax</label>
            <Input readOnly value={`$${totals.totalTax.toFixed(2)}`} className="w-2/3 text-right font-bold" />
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
            <label className="text-lg font-bold text-gray-900 dark:text-white">Total Incl</label>
            <Input readOnly value={`$${totals.totalIncl.toFixed(2)}`} className="w-2/3 text-right text-lg font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrderForm;