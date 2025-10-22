import React from 'react';
import { View, Text } from 'react-native';
import InfoRow from './InfoRow';

interface StorageDetails {
  ownerOrgName: string;
  facilityName: string;
  note: string;
}

interface UnitInfo {
  id: string;
  assetID: string;
  productName: string;
  status: string;
  createdAt: string;
}

interface BatchData {
  id: string;
  shipmentId: string;
  createdAt: string;
  productName?: string;
  storage?: StorageDetails;
  units?: UnitInfo[];
}

const AssetInfoCard = ({ batchData }: { batchData: BatchData }) => (
  <View className="bg-white p-6 rounded-2xl shadow-md mb-6">
    <Text className="text-2xl font-bold text-gray-800">{batchData.id}</Text>
    <Text className="text-sm text-gray-500 mb-2">Từ chuyến hàng: {batchData.shipmentId}</Text>
    {batchData.productName && (
      <Text className="text-lg font-semibold text-gray-700 mb-4">{batchData.productName}</Text>
    )}
    <View className="border-t border-gray-200 pt-4">
      <InfoRow
        icon="calendar-outline"
        label="Ngày nhận"
        value={new Date(batchData.createdAt).toLocaleDateString('vi-VN')}
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
