import { View, Text } from 'react-native';
import React from 'react';

interface SellHeaderProps {
  title: string;
  subtitle: string;
}

const SellHeader: React.FC<SellHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="pt-12 pb-4 bg-white items-center border-b border-gray-200">
      <Text className="text-2xl font-bold text-primary">{title}</Text>
      <Text className="text-secondary mt-1">{subtitle}</Text>
    </View>
  );
};

export default SellHeader;
