import { View, Text } from 'react-native';
import React from 'react';

const ProductList = ({ units }: { units: string[] }) => (
  <View className="mt-8">
    <Text className="text-xl font-bold text-gray-800 mb-4">Danh sách sản phẩm</Text>
    <View className="bg-white rounded-2xl shadow-md p-4">
      {units.map((unitId) => (
        <Text key={unitId} className="text-base text-gray-700 py-2 border-b border-gray-200">
          {unitId}
        </Text>
      ))}
    </View>
  </View>
);

export default ProductList;
