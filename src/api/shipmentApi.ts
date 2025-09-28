import axiosClient from './axiosClient';

export const shipment = {
  deliver: (shipmentID: string, data: { facilityID: string; newAssetPrefix: string }) =>
    axiosClient.post(`/shipments/${shipmentID}/deliver`, data),
};
