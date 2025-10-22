export interface AssetQuantity {
  unit: string;
  value: number;
}
export interface IAsset {
  assetID: string;
  parentAssetIDs?: string[];
  productName?: string;
  status?: string;
  originalQuantity?: AssetQuantity;
  currentQuantity?: AssetQuantity;
}
