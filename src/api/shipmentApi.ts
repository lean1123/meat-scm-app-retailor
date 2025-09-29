import axiosClient from './axiosClient';

export const shipment = {
  deliver: (shipmentID: string, data: any) =>
    axiosClient.post(`/shipments/${shipmentID}/deliver`, data),
};
