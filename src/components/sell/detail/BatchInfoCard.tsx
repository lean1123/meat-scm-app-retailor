import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { RetailBatch } from '../types';

interface BatchInfoCardProps {
  batch: RetailBatch;
  isExpiringSoon: () => boolean;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

const BatchInfoCard: React.FC<BatchInfoCardProps> = ({
  batch,
  isExpiringSoon,
  getStatusColor,
  getStatusText,
}) => {
  return (
    <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-800 mb-3">Thông tin sản phẩm</Text>

      <View className="space-y-3">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Tên sản phẩm:</Text>
          <Text className="font-semibold text-gray-800 flex-1 text-right">{batch.productName}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Số lượng còn lại:</Text>
          <Text className="font-semibold text-gray-800">
            {batch.quantity} {batch.unit}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Giá bán:</Text>
          <Text className="font-semibold text-green-600">
            {batch.price.toLocaleString('vi-VN')} VNĐ/{batch.unit}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Ngày tách:</Text>
          <Text className="font-semibold text-gray-800">
            {new Date(batch.splitDate).toLocaleDateString('vi-VN')}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Hạn sử dụng:</Text>
          <View className="flex-row items-center">
            <Text
              className={`font-semibold ${isExpiringSoon() ? 'text-red-500' : 'text-gray-800'}`}
            >
              {new Date(batch.expiryDate).toLocaleDateString('vi-VN')}
            </Text>
            {isExpiringSoon() && (
              <Ionicons name="warning" size={16} color="#ef4444" className="ml-1" />
            )}
          </View>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Trạng thái:</Text>
          <Text className={`font-semibold ${getStatusColor(batch.status)}`}>
            {getStatusText(batch.status)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BatchInfoCard;
