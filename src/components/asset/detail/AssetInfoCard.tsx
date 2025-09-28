import React from 'react';
import { View, Text } from 'react-native';
import InfoRow from './InfoRow';

interface StorageDetails {
  ownerOrgName: string;
  facilityName: string;
  note: string;
}

interface BatchData {
  id: string;
  shipmentId: string;
  createdAt: string;
  storage?: StorageDetails;
  units?: string[];
}

const AssetInfoCard = ({ batchData }: { batchData: BatchData }) => (
  <View className="bg-white p-6 rounded-2xl shadow-md mb-6">
    <Text className="text-2xl font-bold text-gray-800">{batchData.id}</Text>
    <Text className="text-sm text-gray-500 mb-4">Từ chuyến hàng: {batchData.shipmentId}</Text>
    <View className="border-t border-gray-200 pt-4">
      <InfoRow
        icon="calendar-outline"
        label="Ngày nhận"
        value={new Date(batchData.createdAt).toLocaleDateString()}
      />
      <InfoRow
        icon="location-outline"
        label="Vị trí kho"
        value={batchData.storage?.note || 'Chưa cập nhật'}
      />
      <InfoRow
        icon="cube-outline"
        label="Sản phẩm lẻ"
        value={
          Array.isArray(batchData.units) && batchData.units.length > 0
            ? `${batchData.units.length} sản phẩm`
            : 'Chưa tách'
        }
      />
    </View>
  </View>
);

export default AssetInfoCard;
