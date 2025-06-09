import React, { useState, useMemo } from 'react';
import { Button } from './Button';
import type { Order } from '../types/order';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  ArrowUpDown,
  Filter,
  Eye,
  Search,
  X,
  Download
} from 'lucide-react';

interface OrderListViewProps {
  title: string;
  orders: Order[];
  onBack: () => void;
  onOrderClick: (order: Order) => void;
}

export const OrderListView: React.FC<OrderListViewProps> = ({ 
  title, 
  orders, 
  onBack, 
  onOrderClick 
}) => {
  const [sortField, setSortField] = useState<keyof Order>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [journeyFilter, setJourneyFilter] = useState<string>('all');

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          color: '#E31E24',
          bg: '#FEF1F2',
          border: '#E31E24',
          dot: '#E31E24'
        };
      case 'medium':
        return {
          color: '#FF6B35',
          bg: '#FFF4F0',
          border: '#FF6B35',
          dot: '#FF6B35'
        };
      case 'low':
        return {
          color: '#059669',
          bg: '#F0FDF4',
          border: '#059669',
          dot: '#059669'
        };
      default:
        return {
          color: '#6B7280',
          bg: '#F9FAFB',
          border: '#6B7280',
          dot: '#6B7280'
        };
    }
  };

  const getJourneyConfig = (journey: string) => {
    switch (journey) {
      case 'Provide':
        return {
          color: '#059669',
          bg: '#F0FDF4',
          border: '#059669'
        };
      case 'Modify':
        return {
          color: '#D97706',
          bg: '#FFFBEB',
          border: '#D97706'
        };
      case 'Cease':
        return {
          color: '#DC2626',
          bg: '#FEF2F2',
          border: '#DC2626'
        };
      default:
        return {
          color: '#6B7280',
          bg: '#F9FAFB',
          border: '#6B7280'
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = searchQuery === '' || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.currentTask.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.serviceId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
      const matchesJourney = journeyFilter === 'all' || order.journey === journeyFilter;
      
      return matchesSearch && matchesPriority && matchesJourney;
    });

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      // Special handling for date fields
      if (sortField === 'startDate' || sortField === 'completionDate') {
        const aDate = new Date(aValue as string).getTime();
        const bDate = new Date(bValue as string).getTime();
        return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [orders, searchQuery, priorityFilter, journeyFilter, sortField, sortDirection]);

  const clearFilters = () => {
    setSearchQuery('');
    setPriorityFilter('all');
    setJourneyFilter('all');
  };

  const activeFiltersCount = [
    searchQuery !== '',
    priorityFilter !== 'all',
    journeyFilter !== 'all'
  ].filter(Boolean).length;

  const exportToCSV = () => {
    const headers = [
      'Order ID',
      'Service ID',
      'Customer Name',
      'Journey Type',
      'Status',
      'Priority',
      'Start Date',
      'Current Task',
      'Project Phase',
      'Progress (%)',
      'Description',
      'Estimated Duration',
      'Assigned Team',
      'Category',
      'Subcategory',
      'Notes'
    ];

    // Add conditional headers for delayed orders
    if (orders.some(order => order.delayReason)) {
      headers.push('Delay Reason');
    }
    if (orders.some(order => order.ccDate)) {
      headers.push('CC Date');
    }
    if (orders.some(order => order.queueName)) {
      headers.push('Queue Name', 'Business Days in Queue');
    }

    const csvContent = [
      headers.join(','),
      ...filteredAndSortedOrders.map(order => {
        const row = [
          `"${order.id}"`,
          `"${order.serviceId}"`,
          `"${order.customerName}"`,
          `"${order.journey}"`,
          `"${order.status}"`,
          `"${order.priority}"`,
          `"${order.startDate}"`,
          `"${order.currentTask}"`,
          `"${order.currentProjectProgression}"`,
          order.progress,
          `"${order.description}"`,
          `"${order.estimatedDuration}"`,
          `"${order.assignedTeam || ''}"`,
          `"${order.category}"`,
          `"${order.subcategory}"`,
          `"${order.notes}"`
        ];

        // Add conditional fields
        if (orders.some(order => order.delayReason)) {
          row.push(`"${order.delayReason || ''}"`);
        }
        if (orders.some(order => order.ccDate)) {
          row.push(`"${order.ccDate || ''}"`);
        }
        if (orders.some(order => order.queueName)) {
          row.push(`"${order.queueName || ''}"`, `${order.businessDaysInQueue || ''}`);
        }

        return row.join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.replace(/\s+/g, '_').toLowerCase()}_orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="min-h-full">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="max-w-full mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </button>
                <div>
                  <h1 
                    className="text-xl font-bold"
                    style={{ 
                      color: '#073b4c',
                      fontFamily: 'Arial, sans-serif'
                    }}
                  >
                    {title}
                  </h1>
                  <p 
                    className="mt-1 text-sm font-medium"
                    style={{ 
                      color: '#6B7280',
                      fontFamily: 'Arial, sans-serif'
                    }}
                  >
                    {filteredAndSortedOrders.length} of {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4" style={{ color: '#6B7280' }} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X className="h-4 w-4" style={{ color: '#6B7280' }} />
                    </button>
                  )}
                </div>

                {/* Filter Toggle */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 border-2 hover:bg-gray-50 relative"
                  style={{ 
                    borderColor: '#073b4c',
                    color: '#073b4c',
                    fontFamily: 'Arial, sans-serif'
                  }}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span 
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs flex items-center justify-center"
                      style={{ backgroundColor: '#073b4c', color: 'white' }}
                    >
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>

                {/* Export CSV Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={exportToCSV}
                  className="flex items-center gap-2 border-2 hover:bg-green-50"
                  style={{ 
                    borderColor: '#059669',
                    color: '#059669',
                    fontFamily: 'Arial, sans-serif'
                  }}
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium" style={{ color: '#374151' }}>Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Priority Filter */}
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: '#374151' }}>
                      Priority
                    </label>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      <option value="all">All Priorities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  {/* Journey Filter */}
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: '#374151' }}>
                      Journey Type
                    </label>
                    <select
                      value={journeyFilter}
                      onChange={(e) => setJourneyFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      <option value="all">All Journey Types</option>
                      <option value="Provide">Provide</option>
                      <option value="Modify">Modify</option>
                      <option value="Cease">Cease</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-full mx-auto">
          {filteredAndSortedOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div 
                className="text-lg font-medium"
                style={{ 
                  color: '#9CA3AF',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                No orders found
              </div>
              <p 
                className="mt-2"
                style={{ 
                  color: '#6B7280',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                {searchQuery || priorityFilter !== 'all' || journeyFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'There are no orders in this category at the moment.'
                }
              </p>
            </div>
          ) : (
            /* Orders Table */
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        scope="col" 
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        style={{ 
                          color: '#374151',
                          fontFamily: 'Arial, sans-serif'
                        }}
                        onClick={() => handleSort('id')}
                      >
                        <div className="flex items-center gap-1">
                          Order ID
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        style={{ 
                          color: '#374151',
                          fontFamily: 'Arial, sans-serif'
                        }}
                        onClick={() => handleSort('customerName')}
                      >
                        <div className="flex items-center gap-1">
                          Customer
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        style={{ 
                          color: '#374151',
                          fontFamily: 'Arial, sans-serif'
                        }}
                        onClick={() => handleSort('startDate')}
                      >
                        <div className="flex items-center gap-1">
                          Start Date
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        style={{ 
                          color: '#374151',
                          fontFamily: 'Arial, sans-serif'
                        }}
                        onClick={() => handleSort('journey')}
                      >
                        <div className="flex items-center gap-1">
                          Journey Type
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        style={{ 
                          color: '#374151',
                          fontFamily: 'Arial, sans-serif'
                        }}
                        onClick={() => handleSort('priority')}
                      >
                        <div className="flex items-center gap-1">
                          Priority
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        style={{ 
                          color: '#374151',
                          fontFamily: 'Arial, sans-serif'
                        }}
                        onClick={() => handleSort('currentProjectProgression')}
                      >
                        <div className="flex items-center gap-1">
                          Project Phase
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      {/* Show delay/stuck columns based on order types */}
                      {orders.some(order => order.delayReason) && (
                        <th 
                          scope="col" 
                          className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                          style={{ 
                            color: '#374151',
                            fontFamily: 'Arial, sans-serif'
                          }}
                        >
                          Delay Reason
                        </th>
                      )}
                      {orders.some(order => order.ccDate) && (
                        <th 
                          scope="col" 
                          className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                          style={{ 
                            color: '#374151',
                            fontFamily: 'Arial, sans-serif'
                          }}
                        >
                          CC Date
                        </th>
                      )}
                      {orders.some(order => order.queueName) && (
                        <th 
                          scope="col" 
                          className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                          style={{ 
                            color: '#374151',
                            fontFamily: 'Arial, sans-serif'
                          }}
                        >
                          Queue Info
                        </th>
                      )}
                      <th 
                        scope="col" 
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                        style={{ 
                          color: '#374151',
                          fontFamily: 'Arial, sans-serif'
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAndSortedOrders.map((order) => {
                      const priorityConfig = getPriorityConfig(order.priority);
                      const journeyConfig = getJourneyConfig(order.journey);
                      
                      return (
                        <tr 
                          key={order.id} 
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => onOrderClick(order)}
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold" style={{ color: '#073b4c', fontFamily: 'Arial, sans-serif' }}>
                              {order.id}
                            </div>
                            <div className="text-xs" style={{ color: '#6B7280', fontFamily: 'Arial, sans-serif' }}>
                              {order.serviceId}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div 
                                  className="h-8 w-8 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: '#F3F4F6' }}
                                >
                                  <User className="h-4 w-4" style={{ color: '#6B7280' }} />
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium" style={{ color: '#111827', fontFamily: 'Arial, sans-serif' }}>
                                  {order.customerName}
                                </div>
                                <div className="text-xs" style={{ color: '#6B7280', fontFamily: 'Arial, sans-serif' }}>
                                  {order.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" style={{ color: '#6B7280' }} />
                              <div className="text-sm" style={{ color: '#111827', fontFamily: 'Arial, sans-serif' }}>
                                {formatDate(order.startDate)}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                              style={{
                                backgroundColor: journeyConfig.bg,
                                color: journeyConfig.color,
                                borderColor: journeyConfig.border,
                                fontFamily: 'Arial, sans-serif'
                              }}
                            >
                              {order.journey}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div 
                                className="w-2 h-2 rounded-full mr-2"
                                style={{ backgroundColor: priorityConfig.dot }}
                              ></div>
                              <span 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                                style={{
                                  backgroundColor: priorityConfig.bg,
                                  color: priorityConfig.color,
                                  borderColor: priorityConfig.border,
                                  fontFamily: 'Arial, sans-serif'
                                }}
                              >
                                {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: '#F3F4F6',
                                color: '#374151',
                                fontFamily: 'Arial, sans-serif'
                              }}
                            >
                              {order.currentProjectProgression}
                            </span>
                          </td>
                          {/* Show delay/stuck columns based on order types */}
                          {orders.some(order => order.delayReason) && (
                            <td className="px-4 py-4 whitespace-nowrap">
                              {order.delayReason ? (
                                <div className="text-xs" style={{ color: '#EF4444', fontFamily: 'Arial, sans-serif' }}>
                                  {order.delayReason.length > 30 ? `${order.delayReason.substring(0, 30)}...` : order.delayReason}
                                </div>
                              ) : (
                                <span className="text-xs text-gray-400">-</span>
                              )}
                            </td>
                          )}
                          {orders.some(order => order.ccDate) && (
                            <td className="px-4 py-4 whitespace-nowrap">
                              {order.ccDate ? (
                                <div className="text-xs" style={{ color: '#F59E0B', fontFamily: 'Arial, sans-serif' }}>
                                  {formatDate(order.ccDate)}
                                </div>
                              ) : (
                                <span className="text-xs text-gray-400">-</span>
                              )}
                            </td>
                          )}
                          {orders.some(order => order.queueName) && (
                            <td className="px-4 py-4 whitespace-nowrap">
                              {order.queueName ? (
                                <div>
                                  <div className="text-xs font-medium" style={{ color: '#7C3AED', fontFamily: 'Arial, sans-serif' }}>
                                    {order.queueName}
                                  </div>
                                  {order.businessDaysInQueue && (
                                    <div className="text-xs" style={{ color: '#EF4444', fontFamily: 'Arial, sans-serif' }}>
                                      {order.businessDaysInQueue} days
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-xs text-gray-400">-</span>
                              )}
                            </td>
                          )}
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOrderClick(order);
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 