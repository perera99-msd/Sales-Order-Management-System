import React from 'react';
import Button from './ui/Button';
import Table from './ui/Table';

const SortIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
  </svg>
);

const formatCurrency = (value) => {
  return `$${(Number(value) || 0).toFixed(2)}`;
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch {
    return 'N/A';
  }
};

const OrderList = ({ orders, onAddNew, onOrderSelect, loading, error }) => {
  const columns = [
    {
      title: <>Invoice No. <SortIcon /></>,
      key: 'invoiceNo',
      render: (_, row) => (
        <span className="font-medium text-blue-600 cursor-pointer hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          {row.invoiceNo || 'N/A'}
        </span>
      ),
    },
    {
      title: <>Customer Name <SortIcon /></>,
      key: 'customerName',
      render: (_, row) => row.customerName || 'N/A',
    },
    {
      title: <>Invoice Date <SortIcon /></>,
      key: 'invoiceDate',
      render: (_, row) => formatDate(row.invoiceDate),
    },
    {
      title: <>Reference No. <SortIcon /></>,
      key: 'referenceNo',
      render: (_, row) => row.referenceNo || 'N/A',
    },
    {
      title: <div className="text-right">Total Incl. Amount <SortIcon /></div>,
      key: 'totalIncl',
      render: (_, row) => (
        <span className="font-semibold text-gray-900 dark:text-white text-right block">
          {formatCurrency(row.totalIncl)}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: () => (
        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          Saved
        </span>
      ),
    },
  ];

  const data = orders || [];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading orders...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 dark:bg-red-900 dark:border-red-700">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error loading orders</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No orders</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new sales order.</p>
          <div className="mt-6">
            <Button variant="primary" onClick={onAddNew}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Order
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Table
        columns={columns}
        data={data}
        onRowClick={onOrderSelect}
      />
    );
  };

  return (
    <div className="bg-white p-6 shadow-xl rounded-lg dark:bg-gray-800">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Sales Orders</h2>
        <Button variant="primary" onClick={onAddNew}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New
        </Button>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default OrderList;