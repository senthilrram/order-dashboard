import type { OrderSection } from '../types/order';
import { generateCompleteOrders } from './completeOrders';

// Use the complete set of mock orders with enhanced structure
const mockOrders = generateCompleteOrders();

// Create order sections with realistic distribution
export const orderSections: OrderSection[] = [
  {
    title: 'Orders on Track',
    count: mockOrders.filter(order => order.category === 'Orders on Track').length,
    subcategories: [
      {
        name: 'Order under Validation',
        count: mockOrders.filter(order => order.subcategory === 'Order under Validation').length,
        orders: mockOrders.filter(order => order.subcategory === 'Order under Validation')
      },
      {
        name: 'Triage Orders',
        count: mockOrders.filter(order => order.subcategory === 'Triage Orders').length,
        orders: mockOrders.filter(order => order.subcategory === 'Triage Orders')
      },
      {
        name: 'Orders which are in survey phase',
        count: mockOrders.filter(order => order.subcategory === 'Orders which are in survey phase').length,
        orders: mockOrders.filter(order => order.subcategory === 'Orders which are in survey phase')
      },
      {
        name: 'Orders in Service Planning Phase',
        count: mockOrders.filter(order => order.subcategory === 'Orders in Service Planning Phase').length,
        orders: mockOrders.filter(order => order.subcategory === 'Orders in Service Planning Phase')
      },
      {
        name: 'Orders in JobPack planning Phase',
        count: mockOrders.filter(order => order.subcategory === 'Orders in JobPack planning Phase').length,
        orders: mockOrders.filter(order => order.subcategory === 'Orders in JobPack planning Phase')
      },
      {
        name: 'Orders in Build',
        count: mockOrders.filter(order => order.subcategory === 'Orders in Build').length,
        orders: mockOrders.filter(order => order.subcategory === 'Orders in Build')
      },
      {
        name: 'Orders in Fit and Test',
        count: mockOrders.filter(order => order.subcategory === 'Orders in Fit and Test').length,
        orders: mockOrders.filter(order => order.subcategory === 'Orders in Fit and Test')
      },
      {
        name: 'Orders in Prove Service',
        count: mockOrders.filter(order => order.subcategory === 'Orders in Prove Service').length,
        orders: mockOrders.filter(order => order.subcategory === 'Orders in Prove Service')
      }
    ]
  },
  {
    title: 'Orders on Delay',
    count: mockOrders.filter(order => order.category === 'Orders on Delay').length,
    subcategories: [
      {
        name: 'CP Delayed Orders',
        count: mockOrders.filter(order => order.subcategory === 'CP Delayed Orders').length,
        orders: mockOrders.filter(order => order.subcategory === 'CP Delayed Orders')
      },
      {
        name: 'OR Delayed Orders',
        count: mockOrders.filter(order => order.subcategory === 'OR Delayed Orders').length,
        orders: mockOrders.filter(order => order.subcategory === 'OR Delayed Orders')
      }
    ]
  },
  {
    title: 'Orders which got stuck',
    count: mockOrders.filter(order => order.category === 'Orders which got stuck').length,
    subcategories: [
      {
        name: 'Product Support Group',
        count: mockOrders.filter(order => order.subcategory === 'Product Support Group').length,
        orders: mockOrders.filter(order => order.subcategory === 'Product Support Group')
      },
      {
        name: 'Application Support Group',
        count: mockOrders.filter(order => order.subcategory === 'Application Support Group').length,
        orders: mockOrders.filter(order => order.subcategory === 'Application Support Group')
      },
      {
        name: 'Business Fallout',
        count: mockOrders.filter(order => order.subcategory === 'Functional Fallout').length,
        orders: mockOrders.filter(order => order.subcategory === 'Functional Fallout')
      }
    ]
  }
];

export { mockOrders }; 