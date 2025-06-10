import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import type { OrderSubcategory } from '../types/order';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Users,
  FileSearch,
  Settings,
  Target,
  Package,
  Wrench,
  TestTube,
  Shield,
  HeadphonesIcon,
  Bug,
  AlertCircle
} from 'lucide-react';

interface OrderCardProps {
  subcategory: OrderSubcategory;
  onCardClick: (subcategory: OrderSubcategory) => void;
  sectionTitle: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({ subcategory, onCardClick, sectionTitle }) => {
  // Function to get shorter display names
  const getDisplayName = (fullName: string): string => {
    const nameMap: { [key: string]: string } = {
      'Order under Validation': 'Under Validation',
      'Triage Orders': 'Triage',
      'Orders which are in survey phase': 'Survey',
      'Orders in Service Planning Phase': 'Service Planning',
      'Orders in JobPack planning Phase': 'JobPack Planning',
      'Orders in Build': 'Build',
      'Orders in Fit and Test': 'Fit and Test',
      'Orders in Prove Service': 'Prove Service',
      'CP Delayed Orders': 'CP Delayed',
      'OR Delayed Orders': 'OR Delayed',
      'Product Support Group': 'Product Support',
      'Application Support Group': 'Application Support',
      'Functional Fallout': 'Business Fallout'
    };
    return nameMap[fullName] || fullName;
  };

  // Function to get color and style config based on subsection name
  const getSubsectionConfig = (subcategoryName: string) => {
    const displayName = getDisplayName(subcategoryName);
    
    switch (displayName) {
      case 'Under Validation':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#3B82F6' }, // Blue
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#EFF6FF',
          iconColor: '#3B82F6',
          icon: <CheckCircle2 className="h-6 w-6" style={{ color: '#3B82F6' }} />,
          accentColor: '#3B82F6',
          ringColor: 'rgba(59, 130, 246, 0.2)'
        };
      case 'Triage':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#8B5CF6' }, // Purple
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#F3F4F6',
          iconColor: '#8B5CF6',
          icon: <Target className="h-6 w-6" style={{ color: '#8B5CF6' }} />,
          accentColor: '#8B5CF6',
          ringColor: 'rgba(139, 92, 246, 0.2)'
        };
      case 'Survey':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#10B981' }, // Green
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#ECFDF5',
          iconColor: '#10B981',
          icon: <FileSearch className="h-6 w-6" style={{ color: '#10B981' }} />,
          accentColor: '#10B981',
          ringColor: 'rgba(16, 185, 129, 0.2)'
        };
      case 'Service Planning':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#F59E0B' }, // Amber
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#FFFBEB',
          iconColor: '#F59E0B',
          icon: <Settings className="h-6 w-6" style={{ color: '#F59E0B' }} />,
          accentColor: '#F59E0B',
          ringColor: 'rgba(245, 158, 11, 0.2)'
        };
      case 'JobPack Planning':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#EF4444' }, // Red
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#FEF2F2',
          iconColor: '#EF4444',
          icon: <Package className="h-6 w-6" style={{ color: '#EF4444' }} />,
          accentColor: '#EF4444',
          ringColor: 'rgba(239, 68, 68, 0.2)'
        };
      case 'Build':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#06B6D4' }, // Cyan
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#ECFEFF',
          iconColor: '#06B6D4',
          icon: <Wrench className="h-6 w-6" style={{ color: '#06B6D4' }} />,
          accentColor: '#06B6D4',
          ringColor: 'rgba(6, 182, 212, 0.2)'
        };
      case 'Fit and Test':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#84CC16' }, // Lime
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#F7FEE7',
          iconColor: '#84CC16',
          icon: <TestTube className="h-6 w-6" style={{ color: '#84CC16' }} />,
          accentColor: '#84CC16',
          ringColor: 'rgba(132, 204, 22, 0.2)'
        };
      case 'Prove Service':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#059669' }, // Emerald
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#D1FAE5',
          iconColor: '#059669',
          icon: <Shield className="h-6 w-6" style={{ color: '#059669' }} />,
          accentColor: '#059669',
          ringColor: 'rgba(5, 150, 105, 0.2)'
        };
      case 'CP Delayed':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#FF6B35' }, // Orange
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#FFF4F0',
          iconColor: '#FF6B35',
          icon: <Clock className="h-6 w-6" style={{ color: '#FF6B35' }} />,
          accentColor: '#FF6B35',
          ringColor: 'rgba(255, 107, 53, 0.2)'
        };
      case 'OR Delayed':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#F97316' }, // Orange-600
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#FFF7ED',
          iconColor: '#F97316',
          icon: <Clock className="h-6 w-6" style={{ color: '#F97316' }} />,
          accentColor: '#F97316',
          ringColor: 'rgba(249, 115, 22, 0.2)'
        };
      case 'Product Support':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#DC2626' }, // Red-600
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#FEF2F2',
          iconColor: '#DC2626',
          icon: <HeadphonesIcon className="h-6 w-6" style={{ color: '#DC2626' }} />,
          accentColor: '#DC2626',
          ringColor: 'rgba(220, 38, 38, 0.2)'
        };
      case 'Application Support':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#B91C1C' }, // Red-700
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#FEF2F2',
          iconColor: '#B91C1C',
          icon: <Bug className="h-6 w-6" style={{ color: '#B91C1C' }} />,
          accentColor: '#B91C1C',
          ringColor: 'rgba(185, 28, 28, 0.2)'
        };
      case 'Business Fallout':
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#7C2D12' }, // Red-800
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#FEF2F2',
          iconColor: '#7C2D12',
          icon: <AlertCircle className="h-6 w-6" style={{ color: '#7C2D12' }} />,
          accentColor: '#7C2D12',
          ringColor: 'rgba(124, 45, 18, 0.2)'
        };
      default:
        return {
          bgClass: 'bg-white border-l-4',
          borderStyle: { borderLeftColor: '#6B7280' },
          shadowClass: 'shadow-sm hover:shadow-lg',
          iconBg: '#F9FAFB',
          iconColor: '#6B7280',
          icon: <Users className="h-6 w-6" style={{ color: '#6B7280' }} />,
          accentColor: '#6B7280',
          ringColor: 'rgba(107, 114, 128, 0.2)'
        };
    }
  };

  const displayName = getDisplayName(subcategory.name);
  const statusConfig = getSubsectionConfig(subcategory.name);

  return (
    <Card 
      className={`
        cursor-pointer group transition-all duration-300 ease-out
        ${statusConfig.bgClass} ${statusConfig.shadowClass}
        hover:-translate-y-1 hover:scale-[1.02]
        focus:outline-none active:scale-[0.98] border-r border-t border-b border-gray-200
      `}
      style={{
        ...statusConfig.borderStyle,
        fontFamily: 'Arial, sans-serif'
      }}
      onClick={() => onCardClick(subcategory)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCardClick(subcategory);
        }
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 4px ${statusConfig.ringColor}`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div 
            className="p-2.5 rounded-lg" 
            style={{ 
              backgroundColor: statusConfig.iconBg,
              color: statusConfig.iconColor 
            }}
          >
            {statusConfig.icon}
          </div>
          <ArrowRight 
            className="h-4 w-4 group-hover:translate-x-1 transition-all duration-300" 
            style={{ color: '#9CA3AF' }}
          />
        </div>
        
        <CardTitle 
          className="text-base font-bold leading-tight"
          style={{ 
            color: '#1F2937',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          {displayName}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {/* Main Stats - Centered */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            <span 
              className="text-2xl font-bold"
              style={{ 
                color: '#1F2937',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              {subcategory.count}
            </span>
            <span 
              className="text-xs font-medium"
              style={{ 
                color: '#6B7280',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              {subcategory.count === 1 ? 'Order' : 'Orders'}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span 
              className="text-xs font-medium"
              style={{ 
                color: '#9CA3AF',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              View Details
            </span>
            <div className="flex items-center gap-1">
              <div 
                className="w-1 h-1 rounded-full transition-colors"
                style={{ backgroundColor: statusConfig.accentColor }}
              ></div>
              <div 
                className="w-1 h-1 rounded-full transition-colors delay-75"
                style={{ backgroundColor: statusConfig.accentColor, opacity: 0.7 }}
              ></div>
              <div 
                className="w-1 h-1 rounded-full transition-colors delay-150"
                style={{ backgroundColor: statusConfig.accentColor, opacity: 0.4 }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 