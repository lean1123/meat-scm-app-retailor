import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { RetailBatch } from '../types';

interface ExpiryWarningProps {
  batch: RetailBatch;
  isExpiringSoon: () => boolean;
}

const ExpiryWarning: React.FC<ExpiryWarningProps> = ({ batch, isExpiringSoon }) => {
  if (!isExpiringSoon() || batch.status !== 'available') {
    return null;
  }

  return (
    <View className="bg-yellow-50 border border-yellow-200 mx-4 mt-4 rounded-xl p-4">
      <View className="flex-row items-center">
        <Ionicons name="warning" size={20} color="#f59e0b" />
        <Text className="text-yellow-700 font-semibold ml-2">Sắp hết hạn sử dụng!</Text>
      </View>
      <Text className="text-yellow-600 mt-1">
        Sản phẩm này sẽ hết hạn trong vòng 30 ngày. Nên ưu tiên bán trước.
      </Text>
    </View>
  );
};

export default ExpiryWarning;
