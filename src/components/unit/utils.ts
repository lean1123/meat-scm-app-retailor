import { IUnit, UnitHistory } from './types';

export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'available':
    case 'có sẵn':
      return 'text-green-500';
    case 'sold':
    case 'đã bán':
      return 'text-gray-500';
    case 'damaged':
    case 'hỏng':
      return 'text-red-500';
    case 'reserved':
    case 'đã đặt':
      return 'text-yellow-500';
    default:
      return 'text-gray-500';
  }
};

export const getStatusText = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'available':
      return 'Có sẵn';
    case 'sold':
      return 'Đã bán';
    case 'damaged':
      return 'Hỏng';
    case 'reserved':
      return 'Đã đặt';
    default:
      return status || 'Không xác định';
  }
};

export const isExpiringSoon = (expiryDate: string) => {
  if (!expiryDate) return false;
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7 && diffDays > 0;
};

export const formatQuantity = (quantity?: { unit: string; value: number }) => {
  if (!quantity) return 'N/A';
  return `${quantity.value} ${quantity.unit}`;
};

export const formatPrice = (price?: number) => {
  if (!price) return 'N/A';
  return `${price.toLocaleString('vi-VN')} VNĐ`;
};

// Date formatting utilities
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (dateString: string): string => {
  return `${formatDate(dateString)} ${formatTime(dateString)}`;
};

// Additional status utilities
export const getStatusBackgroundColor = (status: string): string => {
  switch (status?.toLowerCase()) {
    case 'available':
      return 'bg-green-100';
    case 'sold':
      return 'bg-blue-100';
    case 'expired':
      return 'bg-red-100';
    case 'damaged':
      return 'bg-orange-100';
    default:
      return 'bg-gray-100';
  }
};

export const getStatusLabel = (status: string): string => {
  switch (status?.toLowerCase()) {
    case 'available':
      return 'Có sẵn';
    case 'sold':
      return 'Đã bán';
    case 'expired':
      return 'Hết hạn';
    case 'damaged':
      return 'Hỏng';
    default:
      return 'Không xác định';
  }
};

export const isExpired = (expiryDate: string): boolean => {
  return new Date(expiryDate) < new Date();
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffTime = expiry.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getMockUnitHistory = (unitId: string): UnitHistory[] => {
  return [
    {
      id: 'hist-1',
      action: 'created',
      description: 'Sản phẩm được tạo từ lô hàng BATCH-WA-20241215',
      timestamp: '2024-12-20T08:00:00Z',
      performedBy: 'Hệ thống',
    },
    {
      id: 'hist-2',
      action: 'moved',
      description: 'Chuyển từ kho chính đến kệ bán hàng',
      timestamp: '2024-12-20T10:30:00Z',
      location: 'Kệ A1 - Tủ lạnh',
      performedBy: 'Nguyễn Văn A',
    },
    {
      id: 'hist-3',
      action: 'updated',
      description: 'Cập nhật giá bán từ 1,000,000đ thành 1,200,000đ',
      timestamp: '2024-12-20T14:30:00Z',
      performedBy: 'Quản lý cửa hàng',
    },
  ];
};

// Mock data
export const MOCK_UNIT: IUnit = {
  id: 'UNIT-001',
  assetID: 'ASSET-001',
  parentAssetIDs: ['BATCH-001', 'SHIPMENT-001'],
  productName: 'Thịt bò phi lê đóng gói',
  status: 'available',
  originalQuantity: { unit: 'kg', value: 2.5 },
  currentQuantity: { unit: 'kg', value: 2.5 },
  batchCode: 'BTH-2025001',
  expiryDate: '2025-10-20',
  price: 250000,
  shelf: 'A-01-03',
  location: 'Kệ thịt tươi sống',
  createdAt: '2025-10-01T08:00:00Z',
  updatedAt: '2025-10-05T10:30:00Z',
  description: 'Thịt bò phi lê nhập khẩu từ Úc, đóng gói vacuum',
  weight: 2.5,
  temperature: 2,
};

export const MOCK_UNIT_HISTORY: UnitHistory[] = [
  {
    id: 'HIST-001',
    action: 'created',
    description: 'Đơn vị được tạo từ lô hàng chính',
    timestamp: '2025-10-01T08:00:00Z',
    location: 'Kho nhận hàng',
    quantity: { unit: 'kg', value: 2.5 },
    performedBy: 'Nguyễn Văn A',
  },
  {
    id: 'HIST-002',
    action: 'moved',
    description: 'Di chuyển đến kệ bán hàng',
    timestamp: '2025-10-01T10:30:00Z',
    location: 'Kệ A-01-03',
    performedBy: 'Trần Thị B',
  },
  {
    id: 'HIST-003',
    action: 'updated',
    description: 'Cập nhật thông tin giá bán',
    timestamp: '2025-10-02T14:15:00Z',
    performedBy: 'Lê Văn C',
  },
];
