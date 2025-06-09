import React, { useState, useMemo } from 'react';
import { Navbar } from './Navbar';
import { OrderCard } from './OrderCard';
import { OrderListView } from './OrderListView';
import { OrderDetailView } from './OrderDetailView';
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

type ViewType = 'dashboard' | 'orderList' | 'orderDetail';
type TabType = 'on-track' | 'delayed' | 'stuck';

interface ViewState {
  type: ViewType;
  data?: {
    subcategory?: OrderSubcategory;
    order?: Order;
    sectionTitle?: string;
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
      data: { order }
    });
  };

  const handleBackToDashboard = () => {
    setViewState({ type: 'dashboard' });
  };

  const handleBackToOrderList = () => {
    if (viewState.data?.subcategory && viewState.data?.sectionTitle) {
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
          <div className="text-center py-4">
            <h2 
              className="text-xl font-bold mb-2"
              style={{ 
                color: '#073b4c',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Order Processing Workflow
            </h2>
            <p 
              className="text-sm"
              style={{ 
                color: '#6B7280',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Sequential flow from validation to service completion
            </p>
          </div>

          {/* Desktop Sequential Flow - Single Row */}
          <div className="hidden lg:block bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-1 overflow-x-auto">
              {onTrackSubcategories.map((subcategory, index) => {
                // Define stage-specific icons and colors
                const stageConfig = [
                  { icon: FileSearch, color: '#3B82F6', bgColor: '#EFF6FF' }, // Blue
                  { icon: Target, color: '#8B5CF6', bgColor: '#F5F3FF' },      // Purple
                  { icon: Search, color: '#10B981', bgColor: '#ECFDF5' },      // Emerald
                  { icon: Settings, color: '#F59E0B', bgColor: '#FFFBEB' },   // Amber
                  { icon: Package, color: '#EF4444', bgColor: '#FEF2F2' },    // Red
                  { icon: Wrench, color: '#06B6D4', bgColor: '#F0F9FF' },     // Cyan
                  { icon: TestTube, color: '#84CC16', bgColor: '#F7FEE7' },   // Lime
                  { icon: Shield, color: '#059669', bgColor: '#ECFDF5' }      // Green
                ][index] || { icon: CheckCircle2, color: '#6B7280', bgColor: '#F9FAFB' };

                const IconComponent = stageConfig.icon;

                return (
                  <React.Fragment key={subcategory.name}>
                    <div className="flex-shrink-0" style={{ minWidth: '160px', maxWidth: '160px' }}>
                      <div 
                        className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:shadow-lg transition-all duration-200 h-28 hover:scale-105"
                        style={{ backgroundColor: stageConfig.bgColor }}
                        onClick={() => handleCardClick(subcategory, tabSections[0].title)}
                      >
                        {/* Mini Card Header */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <IconComponent 
                              className="w-4 h-4" 
                              style={{ color: stageConfig.color }}
                            />
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: stageConfig.color }}
                            ></div>
                          </div>
                          <span 
                            className="text-xs font-bold px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: stageConfig.color,
                              color: '#FFFFFF'
                            }}
                          >
                            {subcategory.count}
                          </span>
                        </div>
                        {/* Mini Card Title */}
                        <h3 
                          className="text-xs font-bold leading-tight mb-1"
                          style={{ 
                            color: stageConfig.color,
                            fontFamily: 'Arial, sans-serif'
                          }}
                        >
                          {subcategory.name}
                        </h3>
                        {/* Mini Card Description */}
                        <p 
                          className="text-xs"
                          style={{ 
                            color: '#6B7280',
                            fontFamily: 'Arial, sans-serif'
                          }}
                        >
                          Click to view details
                        </p>
                      </div>
                    </div>
                    {index < onTrackSubcategories.length - 1 && (
                      <div className="flex-shrink-0 flex items-center justify-center px-1">
                        <ChevronRight 
                          className="h-6 w-6" 
                          style={{ color: '#073b4c' }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Vertical Flow */}
          <div className="lg:hidden space-y-4">
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: '#073b4c' }}
              ></div>
              <p 
                className="text-sm font-medium"
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

    // Regular grid layout for other tabs
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tabSections[0]?.subcategories.map((subcategory) => (
          <OrderCard
            key={subcategory.name}
            subcategory={subcategory}
            onCardClick={(sub) => handleCardClick(sub, tabSections[0].title)}
            sectionTitle={tabSections[0].title}
          />
        ))}
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
            />
          );
        }
        break;
      default:
        return (
          <div className="space-y-8">
            {/* Dashboard Overview */}
            <div className="text-center py-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h1 
                className="text-2xl font-bold mb-2"
                style={{ 
                  color: '#073b4c',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                Order Management Dashboard
              </h1>
              <p 
                className="text-lg font-normal"
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
            <div className="bg-white border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
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
                    className={`py-4 px-1 border-b-2 font-bold text-sm transition-colors flex items-center gap-2 ${
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
                    {tab.label}
                    {tab.count > 0 && (
                      <span 
                        className="ml-1 px-2 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: activeTab === tab.id ? '#073b4c' : '#E5E7EB',
                          color: activeTab === tab.id ? '#FFFFFF' : '#6B7280'
                        }}
                      >
                        {tab.count}
                      </span>
                    )}
                    <tab.icon 
                      className="h-4 w-4" 
                      style={{ 
                        color: activeTab === tab.id ? '#073b4c' : '#6B7280' 
                      }} 
                    />
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
      <main className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 py-4">
        {renderContent()}
      </main>
    </div>
  );
}; 