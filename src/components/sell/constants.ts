import { RetailBatch } from './types';

// Filter options
export const DATE_FILTERS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Hôm nay', value: 'today' },
  { label: 'Tuần này', value: 'week' },
  { label: 'Tháng này', value: 'month' },
  { label: 'Năm này', value: 'year' },
];

export const EXPIRY_FILTERS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Hết hạn trong 1 tháng', value: '30' },
  { label: 'Hết hạn trong 3 tháng', value: '90' },
  { label: 'Hết hạn trong 6 tháng', value: '180' },
  { label: 'Đã hết hạn', value: 'expired' },
];

export const STATUS_FILTERS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Có sẵn', value: 'available' },
  { label: 'Đã bán', value: 'sold' },
  { label: 'Hết hạn', value: 'expired' },
];

// Mock data
export const MOCK_RETAIL_BATCHES: RetailBatch[] = [
  {
    id: 'RTL-001',
    batchCode: 'RTL-BEEF-001',
    productName: 'Thịt bò phi lê tách bán lẻ',
    quantity: 15,
    unit: 'kg',
    price: 450000,
    expiryDate: '2025-11-15',
    splitDate: '2025-10-01',
    status: 'available',
    originalBatchId: 'BATCH-001',
  },
  {
    id: 'RTL-002',
    batchCode: 'RTL-PORK-002',
    productName: 'Thịt heo ba chỉ tách bán lẻ',
    quantity: 8,
    unit: 'kg',
    price: 320000,
    expiryDate: '2025-10-20',
    splitDate: '2025-09-28',
    status: 'available',
    originalBatchId: 'BATCH-002',
  },
  {
    id: 'RTL-003',
    batchCode: 'RTL-CHICKEN-003',
    productName: 'Thịt gà ta tách bán lẻ',
    quantity: 0,
    unit: 'kg',
    price: 180000,
    expiryDate: '2025-10-25',
    splitDate: '2025-09-25',
    status: 'sold',
    originalBatchId: 'BATCH-003',
  },
  {
    id: 'RTL-004',
    batchCode: 'RTL-BEEF-004',
    productName: 'Thịt bò thăn ngoại tách bán lẻ',
    quantity: 12,
    unit: 'kg',
    price: 520000,
    expiryDate: '2025-12-10',
    splitDate: '2025-09-30',
    status: 'available',
    originalBatchId: 'BATCH-004',
  },
  {
    id: 'RTL-005',
    batchCode: 'RTL-FISH-005',
    productName: 'Cá hồi Na Uy tách bán lẻ',
    quantity: 5,
    unit: 'kg',
    price: 680000,
    expiryDate: '2025-09-30',
    splitDate: '2025-09-20',
    status: 'expired',
    originalBatchId: 'BATCH-005',
  },
];
