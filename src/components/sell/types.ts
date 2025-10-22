export interface RetailBatch {
  id: string;
  batchCode: string;
  productName: string;
  quantity: number;
  unit: string;
  price: number;
  expiryDate: string;
  splitDate: string;
  status: 'available' | 'sold' | 'expired';
  originalBatchId: string;
}

export interface FilterOption {
  label: string;
  value: string;
}
