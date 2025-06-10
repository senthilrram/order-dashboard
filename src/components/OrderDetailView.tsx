import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import type { Order } from '../types/order';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  BarChart3, 
  Building2, 
  FileText, 
  Timer,
  Users,
  CheckCircle2,
  Settings,
  MessageSquare,
  AlertCircle,
  MapPin,
  Target,
  Mail,
  ArrowUp,
  GitBranch,
  Clock3
} from 'lucide-react';

interface OrderDetailViewProps {
  order: Order;
  onBack: () => void;
  onTaskClick?: (order: Order) => void;
}

export const OrderDetailView: React.FC<OrderDetailViewProps> = ({ order, onBack, onTaskClick }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getJourneyColor = (journey: string) => {
    switch (journey) {
      case 'Provide':
        return '#10B981'; // green
      case 'Modify':
        return '#F59E0B'; // amber
      case 'Cease':
        return '#EF4444'; // red
      default:
        return '#6B7280'; // gray
    }
  };

  const getProgressionColor = (progression: string) => {
    switch (progression) {
      case 'P1':
        return '#EF4444'; // red
      case 'P2':
        return '#F59E0B'; // amber
      case 'P3':
        return '#3B82F6'; // blue
      case 'P4':
        return '#10B981'; // green
      case 'P5':
        return '#059669'; // emerald
      default:
        return '#6B7280'; // gray
    }
  };

  const handleFollowUpReminder = () => {
    alert(`Follow-up reminder sent for Order ${order.id}`);
  };

  const handlePrioritizeOrder = () => {
    alert(`Order ${order.id} has been prioritized based on CC Date: ${order.ccDate}`);
  };

  return (
    <div className="space-y-4">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </button>
          <h1 
            className="text-xl font-bold"
            style={{ 
              color: '#073b4c',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            Order Details
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Order Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-4">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h2 
                className="text-xl font-bold mb-2"
                style={{ 
                  color: '#073b4c',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                {order.id}
              </h2>
              <p 
                className="text-gray-600 mb-2"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Service ID: {order.serviceId}
              </p>
              <div className="flex items-center gap-4">
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: getJourneyColor(order.journey) }}
                >
                  {order.journey}
                </span>
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: getProgressionColor(order.currentProjectProgression) }}
                >
                  {order.currentProjectProgression}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span 
                  className="text-sm text-gray-600"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Progress: {order.progress}%
                </span>
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${order.progress}%`,
                    backgroundColor: '#073b4c'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span style={{ fontFamily: 'Arial, sans-serif' }}>
                <strong>Customer:</strong> {order.customerName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span style={{ fontFamily: 'Arial, sans-serif' }}>
                <strong>Start Date:</strong> {order.startDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-500" />
              <span style={{ fontFamily: 'Arial, sans-serif' }}>
                <strong>Current Task:</strong> {order.currentTask}
              </span>
            </div>
          </div>
        </div>

        {/* Current Task Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-4">
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ 
              color: '#073b4c',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            Current Task
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-blue-500" />
                <span 
                  className="font-medium text-gray-900"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {order.currentTask}
                </span>
              </div>
              <p 
                className="text-sm text-gray-600"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Click "Open Task" to view detailed task information and perform actions
              </p>
            </div>
            {onTaskClick && (
              <button
                onClick={() => onTaskClick(order)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <Settings className="h-4 w-4" />
                Open Task
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons for Delayed Orders */}
        {order.category === 'Orders on Delay' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-4">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ 
                color: '#073b4c',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Order Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              {order.subcategory === 'CP Delayed Orders' && (
                <button
                  onClick={handleFollowUpReminder}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <Mail className="h-4 w-4" />
                  Send Follow-up Reminder
                </button>
              )}
              {order.subcategory === 'OR Delayed Orders' && order.ccDate && (
                <button
                  onClick={handlePrioritizeOrder}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <ArrowUp className="h-4 w-4" />
                  Prioritize by CC Date
                </button>
              )}
            </div>
          </div>
        )}

        {/* Delay Information for Delayed Orders */}
        {order.category === 'Orders on Delay' && order.delayReason && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-4">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ 
                color: '#073b4c',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Delay Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p 
                    className="font-medium text-gray-900"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Delay Reason
                  </p>
                  <p 
                    className="text-gray-600 mt-1"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {order.delayReason}
                  </p>
                </div>
              </div>
              {order.ccDate && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p 
                      className="font-medium text-gray-900"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Customer Committed Date
                    </p>
                    <p 
                      className="text-gray-600 mt-1"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {order.ccDate}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Queue Information for Stuck Orders */}
        {order.category === 'Orders which got stuck' && order.queueName && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-4">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ 
                color: '#073b4c',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Queue Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <GitBranch className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <p 
                    className="font-medium text-gray-900"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Current Queue
                  </p>
                  <p 
                    className="text-gray-600 mt-1"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {order.queueName}
                  </p>
                </div>
              </div>
              {order.businessDaysInQueue && (
                <div className="flex items-start gap-3">
                  <Clock3 className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p 
                      className="font-medium text-gray-900"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      Business Days in Queue
                    </p>
                    <p 
                      className="text-gray-600 mt-1"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {order.businessDaysInQueue} days
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Technical Details Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-4">
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ 
              color: '#073b4c',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            Technical Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span 
                  className="font-medium text-gray-900"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  1141 Code A End
                </span>
              </div>
              <p 
                className="text-gray-600 font-mono text-sm bg-gray-50 px-3 py-2 rounded"
                style={{ fontFamily: 'monospace' }}
              >
                {order.code1141AEnd}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span 
                  className="font-medium text-gray-900"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  1141 Code B End
                </span>
              </div>
              <p 
                className="text-gray-600 font-mono text-sm bg-gray-50 px-3 py-2 rounded"
                style={{ fontFamily: 'monospace' }}
              >
                {order.code1141BEnd}
              </p>
            </div>
          </div>
        </div>

        {/* Order Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ 
                color: '#073b4c',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Order Information
            </h3>
            <div className="space-y-3">
              <div>
                <p 
                  className="text-sm font-medium text-gray-500 mb-1"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Description
                </p>
                <p 
                  className="text-gray-900"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {order.description}
                </p>
              </div>
              <div>
                <p 
                  className="text-sm font-medium text-gray-500 mb-1"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Priority
                </p>
                <span 
                  className="px-2 py-1 rounded text-sm font-medium text-white"
                  style={{ backgroundColor: getPriorityColor(order.priority) }}
                >
                  {order.priority.toUpperCase()}
                </span>
              </div>
              {order.assignedTeam && (
                <div>
                  <p 
                    className="text-sm font-medium text-gray-500 mb-1"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Assigned Team
                  </p>
                  <p 
                    className="text-gray-900"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {order.assignedTeam}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Status Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ 
                color: '#073b4c',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Status Information
            </h3>
            <div className="space-y-3">
              <div>
                <p 
                  className="text-sm font-medium text-gray-500 mb-1"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Category
                </p>
                <p 
                  className="text-gray-900"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {order.category}
                </p>
              </div>
              <div>
                <p 
                  className="text-sm font-medium text-gray-500 mb-1"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Subcategory
                </p>
                <p 
                  className="text-gray-900"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {order.subcategory}
                </p>
              </div>
              <div>
                <p 
                  className="text-sm font-medium text-gray-500 mb-1"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Status
                </p>
                <p 
                  className="text-gray-900"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {order.status}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ 
                color: '#073b4c',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Timeline
            </h3>
            <div className="space-y-3">
              <div>
                <p 
                  className="text-sm font-medium text-gray-500 mb-1"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Current Task
                </p>
                <p 
                  className="text-gray-900"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {order.currentTask}
                </p>
              </div>
              <div>
                <p 
                  className="text-sm font-medium text-gray-500 mb-1"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Estimated Duration
                </p>
                <p 
                  className="text-gray-900"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {order.estimatedDuration}
                </p>
              </div>
              {order.completionDate && (
                <div>
                  <p 
                    className="text-sm font-medium text-gray-500 mb-1"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Completion Date
                  </p>
                  <p 
                    className="text-gray-900"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {order.completionDate}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ 
              color: '#073b4c',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            Notes
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p 
              className="text-gray-700 leading-relaxed"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {order.notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 