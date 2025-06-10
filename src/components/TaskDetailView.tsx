import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import type { Order } from '../types/order';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Forward, 
  Clock, 
  User, 
  FileText, 
  Target,
  GitBranch,
  MapPin,
  AlertCircle,
  Settings,
  MessageSquare
} from 'lucide-react';

interface TaskDetailViewProps {
  order: Order;
  onBack: () => void;
}

export const TaskDetailView: React.FC<TaskDetailViewProps> = ({ order, onBack }) => {
  const [selectedQueue, setSelectedQueue] = useState('');
  const [completionNotes, setCompletionNotes] = useState('');
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);

  const availableQueues = [
    'Validation Queue',
    'Survey Team Queue',
    'Service Planning Queue',
    'Build Team Queue',
    'Test Team Queue',
    'Customer Support Queue',
    'Engineering Queue',
    'Quality Assurance Queue'
  ];

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

  const handleCompleteTask = () => {
    if (!completionNotes.trim()) {
      alert('Please provide completion notes');
      return;
    }
    alert(`Task completed for Order ${order.id}\nNotes: ${completionNotes}`);
    setShowCompleteModal(false);
    setCompletionNotes('');
    onBack();
  };

  const handleForwardTask = () => {
    if (!selectedQueue) {
      alert('Please select a queue to forward to');
      return;
    }
    alert(`Task forwarded to ${selectedQueue} for Order ${order.id}`);
    setShowForwardModal(false);
    setSelectedQueue('');
    onBack();
  };

  const getTaskDescription = (currentTask: string, journey: string) => {
    const descriptions: { [key: string]: string } = {
      'Document verification': 'Verify all customer documentation is complete and accurate. Check compliance requirements and validate business information.',
      'Requirements review': 'Review technical and business requirements. Ensure all specifications are clear and achievable within project scope.',
      'Site survey validation': 'Validate site survey results and confirm technical feasibility. Check for any infrastructure constraints or requirements.',
      'Cessation approval': 'Process service cessation request and ensure proper approval workflow. Coordinate equipment recovery planning.',
      'Final documentation review': 'Conduct final review of all project documentation. Ensure completeness and accuracy before progression.',
      'Priority assessment': 'Assess order priority based on customer SLA, business impact, and technical complexity.',
      'Technical feasibility review': 'Review technical requirements and assess implementation feasibility. Identify potential challenges.',
      'Resource allocation planning': 'Plan and allocate necessary resources including personnel, equipment, and time slots.',
      'Cessation impact assessment': 'Assess impact of service cessation on customer operations and dependent services.',
      'Site survey completion': 'Complete comprehensive site survey including technical measurements and access requirements.',
      'Survey data analysis': 'Analyze collected survey data and prepare technical recommendations for implementation.',
      'Equipment planning': 'Plan equipment requirements and validate availability. Coordinate with supply chain team.',
      'Service design': 'Design service architecture and technical implementation approach based on requirements.',
      'Capacity planning': 'Plan network capacity and bandwidth requirements. Ensure adequate resource allocation.',
      'Network design': 'Design detailed network topology and configuration. Create implementation blueprints.',
      'Redundancy planning': 'Plan backup and redundancy solutions. Ensure service continuity and disaster recovery.',
      'Quality planning': 'Plan quality assurance processes and testing procedures. Define acceptance criteria.',
      'Cessation planning': 'Plan service cessation process including timeline, equipment recovery, and customer communication.',
      'Resource planning': 'Plan detailed resource allocation including specialized teams and security clearances.'
    };
    
    return descriptions[currentTask] || `${currentTask} - Standard ${journey.toLowerCase()} process task requiring attention and completion.`;
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
            Back to Order Details
          </button>
          <h1 
            className="text-xl font-bold"
            style={{ 
              color: '#073b4c',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            Task Details
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Task Header Card */}
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
                {order.currentTask}
              </h2>
              <p 
                className="text-gray-600 mb-2"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Order: {order.id}
              </p>
              <div className="flex items-center gap-4">
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: getJourneyColor(order.journey) }}
                >
                  {order.journey} Journey
                </span>
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
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
        </div>

        {/* Task Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Task Information */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: '#073b4c', fontFamily: 'Arial, sans-serif' }}>
                <Target className="h-5 w-5" />
                Task Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Journey Type
                </label>
                <p className="text-base mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {order.journey}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Task Name
                </label>
                <p className="text-base mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {order.currentTask}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Task Description
                </label>
                <p className="text-sm mt-1 text-gray-600 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {getTaskDescription(order.currentTask, order.journey)}
                </p>
              </div>
              {order.queueName && (
                <div>
                  <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Queue Name
                  </label>
                  <p className="text-base mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {order.queueName}
                  </p>
                </div>
              )}
              {order.businessDaysInQueue && (
                <div>
                  <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Days in Queue
                  </label>
                  <p className="text-base mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {order.businessDaysInQueue} business days
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: '#073b4c', fontFamily: 'Arial, sans-serif' }}>
                <FileText className="h-5 w-5" />
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Customer
                </label>
                <p className="text-base mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {order.customerName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Service ID
                </label>
                <p className="text-base mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {order.serviceId}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Description
                </label>
                <p className="text-sm mt-1 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {order.description}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Estimated Duration
                </label>
                <p className="text-base mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {order.estimatedDuration}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Assigned Team
                </label>
                <p className="text-base mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {order.assignedTeam || 'Not assigned'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Priority
                </label>
                <span className={`inline-block px-2 py-1 rounded text-sm font-medium mt-1 ${
                  order.priority === 'high' ? 'bg-red-100 text-red-800' :
                  order.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {order.priority.toUpperCase()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Notes */}
        <Card className="border border-gray-200 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: '#073b4c', fontFamily: 'Arial, sans-serif' }}>
              <MessageSquare className="h-5 w-5" />
              Task Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
              {order.notes || 'No specific notes available for this task.'}
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: '#073b4c', fontFamily: 'Arial, sans-serif' }}>
            Task Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => setShowCompleteModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              Complete Task
            </Button>
            <Button
              onClick={() => setShowForwardModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <Forward className="h-4 w-4" />
              Forward to Queue
            </Button>
          </div>
        </div>

        {/* Complete Task Modal */}
        {showCompleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#073b4c', fontFamily: 'Arial, sans-serif' }}>
                Complete Task
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Completion Notes
                </label>
                <textarea
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Enter completion notes..."
                  style={{ fontFamily: 'Arial, sans-serif' }}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleCompleteTask}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex-1"
                >
                  Complete
                </Button>
                <Button
                  onClick={() => setShowCompleteModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Forward Task Modal */}
        {showForwardModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-4" style={{ color: '#073b4c', fontFamily: 'Arial, sans-serif' }}>
                Forward Task
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Select Queue
                </label>
                <select
                  value={selectedQueue}
                  onChange={(e) => setSelectedQueue(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <option value="">Select a queue...</option>
                  {availableQueues.map((queue) => (
                    <option key={queue} value={queue}>
                      {queue}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleForwardTask}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex-1"
                >
                  Forward
                </Button>
                <Button
                  onClick={() => setShowForwardModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 