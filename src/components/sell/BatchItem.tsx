import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { RetailBatch } from './types';

interface BatchItemProps {
  item: RetailBatch;
  onPress: (id: string) => void;
  isExpiringSoon: (expiryDate: string) => boolean;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

const BatchItem: React.FC<BatchItemProps> = ({
  item,
  onPress,
  isExpiringSoon,
  getStatusColor,
  getStatusText,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      className="bg-white rounded-xl p-4 mb-4 shadow-sm"
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800 mb-1">{item.productName}</Text>
          <Text className="text-gray-500 text-sm">Mã: {item.batchCode}</Text>
        </View>

        {isExpiringSoon(item.expiryDate) && item.status === 'available' && (
          <View className="bg-yellow-100 px-2 py-1 rounded-full">
            <Text className="text-yellow-700 text-xs font-semibold">Sắp hết hạn</Text>
          </View>
        )}
      </View>

      <View className="space-y-1">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Số lượng:</Text>
          <Text className="font-semibold text-gray-800">
            {item.quantity} {item.unit}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Giá bán:</Text>
          <Text className="font-semibold text-green-600">
            {item.price.toLocaleString('vi-VN')} VNĐ/{item.unit}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Hạn sử dụng:</Text>
          <Text
            className={`font-semibold ${isExpiringSoon(item.expiryDate) ? 'text-red-500' : 'text-gray-800'}`}
          >
            {new Date(item.expiryDate).toLocaleDateString('vi-VN')}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Trạng thái:</Text>
          <Text className={`font-semibold ${getStatusColor(item.status)}`}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BatchItem;
