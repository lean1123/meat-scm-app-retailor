import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const EmptyState: React.FC = () => {
  return (
    <View className="items-center justify-center mt-12">
      <Ionicons name="archive-outline" size={64} color="#9CA3AF" />
      <Text className="text-center text-gray-500 mt-4 text-lg">Không tìm thấy lô hàng phù hợp</Text>
      <Text className="text-center text-gray-400 mt-2">
        Thử thay đổi điều kiện lọc hoặc tìm kiếm
      </Text>
    </View>
  );
};

export default EmptyState;
