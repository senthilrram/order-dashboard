import React, { useState, useMemo } from 'react';
import { Navbar } from './Navbar';
import { OrderCard } from './OrderCard';
import { OrderListView } from './OrderListView';
import { OrderDetailView } from './OrderDetailView';
import { TaskDetailView } from './TaskDetailView';
import { orderSections } from '../data/mockData';
import type { Order, OrderSubcategory } from '../types/order';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ChevronRight,
  FileSearch,
  Target,
  Search,
  Settings,
  Package,
  Wrench,
  TestTube,
  Shield
} from 'lucide-react';

type ViewType = 'dashboard' | 'orderList' | 'orderDetail' | 'taskDetail';
type TabType = 'on-track' | 'delayed' | 'stuck';

interface ViewState {
  type: ViewType;
  data?: {
    subcategory?: OrderSubcategory;
    order?: Order;
    sectionTitle?: string;
    fromOrderList?: {
      subcategory: OrderSubcategory;
      sectionTitle: string;
    };
  };
}

export const Dashboard: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'dashboard' });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('on-track');

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return orderSections;
    
    return orderSections.map(section => ({
      ...section,
      subcategories: section.subcategories.map(subcategory => ({
        ...subcategory,
        orders: subcategory.orders.filter(order =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.currentTask.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(subcategory => subcategory.orders.length > 0)
    })).filter(section => section.subcategories.length > 0);
  }, [searchQuery]);

  // Get sections based on active tab
  const getTabSections = () => {
    const sections = searchQuery ? filteredSections : orderSections;
    switch (activeTab) {
      case 'on-track':
        return sections.filter(section => section.title === 'Orders on Track');
      case 'delayed':
        return sections.filter(section => section.title === 'Orders on Delay');
      case 'stuck':
        return sections.filter(section => section.title === 'Orders which got stuck');
      default:
        return [];
    }
  };

  const handleCardClick = (subcategory: OrderSubcategory, sectionTitle: string) => {
    setViewState({
      type: 'orderList',
      data: { subcategory, sectionTitle }
    });
  };

  const handleOrderClick = (order: Order) => {
    setViewState({
      type: 'orderDetail',
      data: { 
        order,
        fromOrderList: viewState.data?.subcategory && viewState.data?.sectionTitle ? {
          subcategory: viewState.data.subcategory,
          sectionTitle: viewState.data.sectionTitle
        } : undefined
      }
    });
  };

  const handleTaskClick = (order: Order) => {
    setViewState({
      type: 'taskDetail',
      data: { 
        order,
        fromOrderList: viewState.data?.fromOrderList
      }
    });
  };

  const handleBackFromTaskToOrder = () => {
    if (viewState.data?.order) {
      setViewState({
        type: 'orderDetail',
        data: { 
          order: viewState.data.order,
          fromOrderList: viewState.data?.fromOrderList
        }
      });
    } else {
      handleBackToOrderList();
    }
  };

  const handleBackToDashboard = () => {
    setViewState({ type: 'dashboard' });
  };

  const handleBackToOrderList = () => {
    if (viewState.data?.fromOrderList) {
      setViewState({
        type: 'orderList',
        data: { 
          subcategory: viewState.data.fromOrderList.subcategory, 
          sectionTitle: viewState.data.fromOrderList.sectionTitle 
        }
      });
    } else if (viewState.data?.subcategory && viewState.data?.sectionTitle) {
      setViewState({
        type: 'orderList',
        data: { 
          subcategory: viewState.data.subcategory, 
          sectionTitle: viewState.data.sectionTitle 
        }
      });
    } else {
      setViewState({ type: 'dashboard' });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Reset to dashboard view when searching
    if (viewState.type !== 'dashboard') {
      setViewState({ type: 'dashboard' });
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Handle logout logic here
  };

  const renderTabContent = () => {
    const tabSections = getTabSections();
    
    if (tabSections.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
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
            {searchQuery ? 'Try adjusting your search terms' : 'No orders in this category'}
          </p>
        </div>
      );
    }

    // Special sequential layout for "On Track" tab
    if (activeTab === 'on-track') {
      const onTrackSubcategories = tabSections[0]?.subcategories || [];
      
      return (
        <div className="space-y-6">
          {/* Sequential Flow Title */}
          <div className="text-center py-3 sm:py-4">
            <h2 
              className="text-lg sm:text-xl font-bold mb-2"
              style={{ 
                color: '#073b4c',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Order Processing Workflow
            </h2>
            <p 
              className="text-xs sm:text-sm px-2"
              style={{ 
                color: '#6B7280',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Sequential flow from validation to service completion
            </p>
          </div>

          {/* Desktop Sequential Flow - Single Row Layout */}
          <div className="hidden md:block bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
            <div className="space-y-6">
              {/* Single Row - All 8 phases */}
              <div className="flex items-center justify-between gap-2 overflow-x-auto">
                {onTrackSubcategories.map((subcategory, index) => {
                  // Define stage-specific icons and colors for all 8 phases
                  const stageConfigs = [
                    { icon: FileSearch, color: '#3B82F6', bgColor: '#EFF6FF' }, // Blue
                    { icon: Target, color: '#8B5CF6', bgColor: '#F5F3FF' },      // Purple
                    { icon: Search, color: '#10B981', bgColor: '#ECFDF5' },      // Emerald
                    { icon: Settings, color: '#F59E0B', bgColor: '#FFFBEB' },   // Amber
                    { icon: Package, color: '#EF4444', bgColor: '#FEF2F2' },    // Red
                    { icon: Wrench, color: '#06B6D4', bgColor: '#F0F9FF' },     // Cyan
                    { icon: TestTube, color: '#84CC16', bgColor: '#F7FEE7' },   // Lime
                    { icon: Shield, color: '#059669', bgColor: '#ECFDF5' }      // Green
                  ];

                  const stageConfig = stageConfigs[index] || { icon: CheckCircle2, color: '#6B7280', bgColor: '#F9FAFB' };

                  // Map long names to short names for all phases
                  const shortNames = [
                    'Validation',
                    'Triage', 
                    'Survey',
                    'Service Planning',
                    'JobPack Planning',
                    'Build',
                    'Fit & Test',
                    'Prove Service'
                  ];

                  const IconComponent = stageConfig.icon;

                  return (
                    <React.Fragment key={subcategory.name}>
                      <div className="flex-1" style={{ minWidth: '140px', maxWidth: '160px' }}>
                        <div 
                          className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:shadow-lg transition-all duration-200 h-44 hover:scale-105 flex flex-col"
                          style={{ backgroundColor: stageConfig.bgColor }}
                          onClick={() => handleCardClick(subcategory, tabSections[0].title)}
                        >
                          {/* Large Order Count - Most Prominent */}
                          <div className="text-center mb-4">
                            <div 
                              className="text-4xl font-bold mb-1"
                              style={{ color: stageConfig.color }}
                            >
                              {subcategory.count}
                            </div>
                            <div 
                              className="text-xs font-medium"
                              style={{ color: '#6B7280' }}
                            >
                              Orders
                            </div>
                          </div>
                          
                          {/* Icon and Phase Name */}
                          <div className="flex flex-col items-center text-center flex-1">
                            <IconComponent 
                              className="w-6 h-6 mb-2" 
                              style={{ color: stageConfig.color }}
                            />
                            <h3 
                              className="text-sm font-bold leading-tight"
                              style={{ 
                                color: stageConfig.color,
                                fontFamily: 'Arial, sans-serif'
                              }}
                            >
                              {shortNames[index] || subcategory.name}
                            </h3>
                          </div>
                          
                          {/* Status Indicator */}
                          <div className="mt-auto pt-2 text-center">
                            <div 
                              className="w-3 h-3 rounded-full mx-auto"
                              style={{ backgroundColor: stageConfig.color }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      {index < onTrackSubcategories.length - 1 && (
                        <div className="flex items-center justify-center px-1">
                          {/* Bold Custom Arrow: -----> */}
                          <div className="flex items-center" style={{ color: '#073b4c' }}>
                            <div className="flex items-center">
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1 h-1 mx-0.5"
                                  style={{ backgroundColor: '#073b4c' }}
                                />
                              ))}
                            </div>
                            <div className="ml-1">
                              <div 
                                className="w-0 h-0"
                                style={{
                                  borderLeft: '12px solid #073b4c',
                                  borderTop: '8px solid transparent',
                                  borderBottom: '8px solid transparent'
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Vertical Flow */}
          <div className="md:hidden space-y-3 sm:space-y-4">
            {onTrackSubcategories.map((subcategory, index) => (
              <React.Fragment key={subcategory.name}>
                <div className="w-full">
                  <OrderCard
                    subcategory={subcategory}
                    onCardClick={(sub) => handleCardClick(sub, tabSections[0].title)}
                    sectionTitle={tabSections[0].title}
                  />
                </div>
                {index < onTrackSubcategories.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-1 h-8"
                        style={{ backgroundColor: '#073b4c' }}
                      ></div>
                      <ChevronRight 
                        className="h-6 w-6 transform rotate-90" 
                        style={{ color: '#073b4c' }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Flow Legend */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div 
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#073b4c' }}
              ></div>
              <p 
                className="text-xs sm:text-sm font-medium"
                style={{ 
                  color: '#073b4c',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Sequential Workflow: Orders progress through each stage in sequence from left to right
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Regular grid layout for other tabs with descriptive headings
    return (
      <div className="space-y-6">
        {/* Section-specific heading */}
        <div className="text-center py-3 sm:py-4">
          {activeTab === 'delayed' && (
            <>
              <h2 
                className="text-lg sm:text-xl font-bold mb-2"
                style={{ 
                  color: '#073b4c',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Order Delay Management
              </h2>
              <p 
                className="text-xs sm:text-sm px-2"
                style={{ 
                  color: '#6B7280',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Monitoring and resolving orders experiencing delays
              </p>
            </>
          )}
          {activeTab === 'stuck' && (
            <>
              <h2 
                className="text-lg sm:text-xl font-bold mb-2"
                style={{ 
                  color: '#073b4c',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Order Recovery Center
              </h2>
              <p 
                className="text-xs sm:text-sm px-2"
                style={{ 
                  color: '#6B7280',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Critical intervention required for stuck orders
              </p>
            </>
          )}
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tabSections[0]?.subcategories.map((subcategory) => (
            <OrderCard
              key={subcategory.name}
              subcategory={subcategory}
              onCardClick={(sub) => handleCardClick(sub, tabSections[0].title)}
              sectionTitle={tabSections[0].title}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (viewState.type) {
      case 'orderList':
        if (viewState.data?.subcategory) {
          return (
            <OrderListView
              title={viewState.data.subcategory.name}
              orders={viewState.data.subcategory.orders}
              onBack={handleBackToDashboard}
              onOrderClick={handleOrderClick}
            />
          );
        }
        break;
      case 'orderDetail':
        if (viewState.data?.order) {
          return (
            <OrderDetailView
              order={viewState.data.order}
              onBack={handleBackToOrderList}
              onTaskClick={handleTaskClick}
            />
          );
        }
        break;
      case 'taskDetail':
        if (viewState.data?.order) {
          return (
            <TaskDetailView
              order={viewState.data.order}
              onBack={handleBackFromTaskToOrder}
            />
          );
        }
        break;
      default:
        return (
          <div className="space-y-8">
            {/* Dashboard Overview */}
            <div className="text-center py-4 sm:py-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h1 
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ 
                  color: '#073b4c',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Order Management Dashboard
              </h1>
              <p 
                className="text-sm sm:text-lg font-normal px-2"
                style={{ 
                  color: '#6B7280',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Track and manage orders across different stages with real-time insights
              </p>
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#073b4c' }}
                  ></div>
                  <p 
                    className="font-medium"
                    style={{ 
                      color: '#073b4c',
                      fontFamily: 'Arial, sans-serif'
                    }}
                  >
                    {filteredSections.length > 0 
                      ? `Showing results for "${searchQuery}"`
                      : `No results found for "${searchQuery}"`
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 overflow-x-auto">
              <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max sm:min-w-0">
                {[
                  { 
                    id: 'on-track', 
                    label: 'On Track', 
                    count: orderSections.find(s => s.title === 'Orders on Track')?.count || 0,
                    icon: CheckCircle2
                  },
                  { 
                    id: 'delayed', 
                    label: 'Delayed', 
                    count: orderSections.find(s => s.title === 'Orders on Delay')?.count || 0,
                    icon: Clock
                  },
                  { 
                    id: 'stuck', 
                    label: 'Stuck', 
                    count: orderSections.find(s => s.title === 'Orders which got stuck')?.count || 0,
                    icon: AlertTriangle
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-current'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                    style={{
                      color: activeTab === tab.id ? '#073b4c' : '#6B7280',
                      borderColor: activeTab === tab.id ? '#073b4c' : 'transparent',
                      fontFamily: 'Arial, sans-serif'
                    }}
                  >
                    <tab.icon 
                      className="h-3 w-3 sm:h-4 sm:w-4" 
                      style={{ 
                        color: activeTab === tab.id ? '#073b4c' : '#6B7280' 
                      }} 
                    />
                    <span className="hidden xs:inline sm:inline">{tab.label}</span>
                    {tab.count > 0 && (
                      <span 
                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: activeTab === tab.id ? '#073b4c' : '#E5E7EB',
                          color: activeTab === tab.id ? '#FFFFFF' : '#6B7280'
                        }}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {renderTabContent()}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={handleSearch} onLogout={handleLogout} />
      <main className="max-w-full mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        {renderContent()}
      </main>
    </div>
  );
}; 