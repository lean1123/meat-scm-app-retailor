import axiosClient from './axiosClient';

export const asset = {
  fetchAssetByFacilityID: (facilityID: string) =>
    axiosClient.get(`/facilities/${facilityID}/assets`),

  updateStorage: (assetID: string, details: any) =>
    axiosClient.post(`/assets/${assetID}/storage`, { details }),

  splitToUnits: (data: { parentAssetID: string; unitCount: number; unitIDPrefix: string }) =>
    axiosClient.post(`/assets/split-to-units`, data),

  updateUnitStorage: (unitID: string, details: any) =>
    axiosClient.post(`/assets/${unitID}/storage`, { details }),

  sell: (unitID: string, details: any) => axiosClient.post(`/assets/${unitID}/sell`, { details }),
};
