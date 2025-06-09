import type { OrderSection } from '../types/order';
import { generateCompleteOrders } from './completeOrders';

// Use the complete set of mock orders with enhanced structure
const mockOrders = generateCompleteOrders();

// Create order sections with realistic distribution
export const orderSections: OrderSection[] = [
  {
    title: 'Orders on Track',
    count: 37, // Total of all subcategories
    subcategories: [
      {
        name: 'Order under Validation',
        count: 5,
        orders: mockOrders.filter(order => order.subcategory === 'Order under Validation')
      },
      {
        name: 'Triage Orders',
        count: 4,
        orders: mockOrders.filter(order => order.subcategory === 'Triage Orders')
      },
      {
        name: 'Orders which are in survey phase',
        count: 6,
        orders: mockOrders.filter(order => order.subcategory === 'Orders which are in survey phase')
      },
      {
        name: 'Orders in Service Planning Phase',
        count: 7,
        orders: mockOrders.filter(order => order.subcategory === 'Orders in Service Planning Phase')
      },
      {
        name: 'Orders in JobPack planning Phase',
        count: 5,
        orders: mockOrders.filter(order => order.subcategory === 'Orders in JobPack planning Phase')
      },
      {
        name: 'Orders in Build',
        count: 4,
        orders: mockOrders.filter(order => order.subcategory === 'Orders in Build')
      },
      {
        name: 'Orders in Fit and Test',
        count: 3,
        orders: mockOrders.filter(order => order.subcategory === 'Orders in Fit and Test')
      },
      {
        name: 'Orders in Prove Service',
        count: 3,
        orders: mockOrders.filter(order => order.subcategory === 'Orders in Prove Service')
      }
    ]
  },
  {
    title: 'Orders on Delay',
    count: 8, // Total of both subcategories
    subcategories: [
      {
        name: 'CP Delayed Orders',
        count: 5,
        orders: mockOrders.filter(order => order.subcategory === 'CP Delayed Orders')
      },
      {
        name: 'OR Delayed Orders',
        count: 3,
        orders: mockOrders.filter(order => order.subcategory === 'OR Delayed Orders')
      }
    ]
  },
  {
    title: 'Orders which got stuck',
    count: 9, // Total of all subcategories
    subcategories: [
      {
        name: 'Product Support Group',
        count: 4,
        orders: mockOrders.filter(order => order.subcategory === 'Product Support Group')
      },
      {
        name: 'Application Support Group',
        count: 3,
        orders: mockOrders.filter(order => order.subcategory === 'Application Support Group')
      },
      {
        name: 'Functional Fallout',
        count: 2,
        orders: mockOrders.filter(order => order.subcategory === 'Functional Fallout')
      }
    ]
  }
];

export { mockOrders }; 