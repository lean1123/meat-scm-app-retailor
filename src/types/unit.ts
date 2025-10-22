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
}
