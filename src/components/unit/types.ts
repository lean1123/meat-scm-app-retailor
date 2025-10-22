export interface UnitQuantity {
  unit: string;
  value: number;
}

export interface IUnit {
  assetID: string;
  parentAssetIDs?: string[];
  productName?: string;
  status?: string;
  originalQuantity?: UnitQuantity;
  currentQuantity?: UnitQuantity;
  // Extended properties for detail view
  id?: string;
  batchCode?: string;
  expiryDate?: string;
  price?: number;
  shelf?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  weight?: number;
  temperature?: number;
}

export interface UnitHistory {
  id: string;
  action: 'created' | 'moved' | 'sold' | 'updated' | 'damaged';
  description: string;
  timestamp: string;
  location?: string;
  quantity?: UnitQuantity;
  performedBy?: string;
}

export interface SaleTransaction {
  unitId: string;
  quantity: UnitQuantity;
  price: number;
  customerInfo?: string;
  notes?: string;
}

export interface ShelfUpdateData {
  unitId: string;
  location: string;
  temperature?: number;
  notes?: string;
}

export interface ParentTraceResult {
  shipmentId: string;
  shipmentBatch: string;
  parentAssetId: string;
  origin: string;
  splitHistory?: {
    timestamp: string;
    fromQuantity: number;
    toQuantity: number;
    notes?: string;
  }[];
}
