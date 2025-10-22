import { RetailBatch } from './types';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'text-green-500';
    case 'sold':
      return 'text-gray-500';
    case 'expired':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'available':
      return 'Có sẵn';
    case 'sold':
      return 'Đã bán';
    case 'expired':
      return 'Hết hạn';
    default:
      return 'Không xác định';
  }
};

export const isExpiringSoon = (expiryDate: string) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 30 && diffDays > 0;
};

export const getFilteredBatches = (
  batches: RetailBatch[],
  search: string,
  dateFilter: string,
  expiryFilter: string,
  statusFilter: string,
) => {
  return batches.filter((batch) => {
    // Search filter
    const matchSearch =
      batch.productName.toLowerCase().includes(search.toLowerCase()) ||
      batch.batchCode.toLowerCase().includes(search.toLowerCase());

    // Date filter (based on split date)
    const matchDate = (() => {
      if (dateFilter === 'all') return true;

      const today = new Date();
      const splitDate = new Date(batch.splitDate);

      switch (dateFilter) {
        case 'today':
          return splitDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return splitDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
          return splitDate >= monthAgo;
        case 'year':
          const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
          return splitDate >= yearAgo;
        default:
          return true;
      }
    })();

    // Expiry filter
    const matchExpiry = (() => {
      if (expiryFilter === 'all') return true;

      const today = new Date();
      const expiryDate = new Date(batch.expiryDate);

      if (expiryFilter === 'expired') {
        return expiryDate < today;
      }

      const daysUntilExpiry = Math.ceil(
        (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );
      const filterDays = parseInt(expiryFilter);

      return daysUntilExpiry <= filterDays && daysUntilExpiry > 0;
    })();

    // Status filter
    const matchStatus = statusFilter === 'all' ? true : batch.status === statusFilter;

    return matchSearch && matchDate && matchExpiry && matchStatus;
  });
};
