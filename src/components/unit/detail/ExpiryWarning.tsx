import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IUnit } from '../types';
import { isExpiringSoon } from '../utils';

interface ExpiryWarningProps {
  unit: IUnit;
}

const ExpiryWarning: React.FC<ExpiryWarningProps> = ({ unit }) => {
  if (!unit.expiryDate || !isExpiringSoon(unit.expiryDate) || unit.status !== 'available') {
    return null;
  }

  return (
    <View className="bg-yellow-50 border border-yellow-200 mx-4 mt-4 rounded-xl p-4">
      <View className="flex-row items-center">
        <Ionicons name="warning" size={20} color="#f59e0b" />
        <Text className="text-yellow-700 font-semibold ml-2">Sắp hết hạn sử dụng!</Text>
      </View>
      <Text className="text-yellow-600 mt-1">
        Sản phẩm này sẽ hết hạn trong vòng 7 ngày. Nên ưu tiên bán trước hoặc xử lý kịp thời.
      </Text>
    </View>
  );
};

export default ExpiryWarning;
