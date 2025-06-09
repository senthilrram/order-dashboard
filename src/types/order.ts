// Types for the order management system

export type Priority = 'high' | 'medium' | 'low';
export type Journey = 'Provide' | 'Modify' | 'Cease';
export type ProjectProgression = 'P1' | 'P2' | 'P3' | 'P4' | 'P5';

export interface Order {
  id: string; // This serves as the order number
  serviceId: string;
  journey: Journey;
  status: string;
  startDate: string;
  completionDate?: string;
  code1141AEnd: string;
  code1141BEnd: string;
  currentTask: string;
  priority: Priority;
  progress: number;
  currentProjectProgression: ProjectProgression;
  customerName: string;
  category: string;
  subcategory: string;
  description: string;
  estimatedDuration: string;
  assignedTeam?: string;
  notes: string;
  
  // Fields for delayed orders
  delayReason?: string;
  ccDate?: string; // Customer Committed Date for OR Delayed orders
  
  // Fields for stuck orders
  queueName?: string;
  businessDaysInQueue?: number;
}

export interface OrderSubcategory {
  name: string;
  count: number;
  orders: Order[];
}

export interface OrderSection {
  title: string;
  count: number;
  subcategories: OrderSubcategory[];
} 