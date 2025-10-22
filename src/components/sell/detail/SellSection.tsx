import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { RetailBatch } from '../types';

interface SellSectionProps {
  batch: RetailBatch;
  sellQuantity: number;
  setSellQuantity: (quantity: number) => void;
  handleSell: () => void;
}

const SellSection: React.FC<SellSectionProps> = ({
  batch,
  sellQuantity,
  setSellQuantity,
  handleSell,
}) => {
  if (batch.status !== 'available') {
    return null;
  }

  return (
    <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-800 mb-3">Bán hàng</Text>

      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-gray-600">Số lượng bán:</Text>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => setSellQuantity(Math.max(1, sellQuantity - 1))}
            className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
          >
            <Ionicons name="remove" size={16} color="#374151" />
          </TouchableOpacity>
          <Text className="mx-4 text-lg font-semibold">{sellQuantity}</Text>
          <TouchableOpacity
            onPress={() => setSellQuantity(Math.min(batch.quantity, sellQuantity + 1))}
            className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
          >
            <Ionicons name="add" size={16} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-between mb-4">
        <Text className="text-gray-600">Tổng tiền:</Text>
        <Text className="text-xl font-bold text-green-600">
          {(sellQuantity * batch.price).toLocaleString('vi-VN')} VNĐ
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleSell}
        className="bg-green-600 rounded-xl py-3 items-center"
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-lg">Bán hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SellSection;
