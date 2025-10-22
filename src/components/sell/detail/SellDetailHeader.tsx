import { View, Text } from 'react-native';
import React from 'react';

interface SellDetailHeaderProps {
  title: string;
  batchCode: string;
}

const SellDetailHeader: React.FC<SellDetailHeaderProps> = ({ title, batchCode }) => {
  return (
    <View className="pt-12 pb-4 bg-white items-center border-b border-gray-200">
      <Text className="text-2xl font-bold text-gray-800">{title}</Text>
      <Text className="text-gray-500 mt-1">{batchCode}</Text>
    </View>
  );
};

export default SellDetailHeader;
