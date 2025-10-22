import { View, Text } from 'react-native';
import React from 'react';

interface ResultsCountProps {
  count: number;
}

const ResultsCount: React.FC<ResultsCountProps> = ({ count }) => {
  return (
    <View className="bg-gray-50 px-4 py-2">
      <Text className="text-secondary text-sm">Tìm thấy {count} lô hàng</Text>
    </View>
  );
};

export default ResultsCount;
