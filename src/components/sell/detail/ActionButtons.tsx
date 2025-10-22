import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { RetailBatch } from '../types';

interface ActionButtonsProps {
  batch: RetailBatch;
  onViewOriginalBatch: () => void;
  onGoBack: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ batch, onViewOriginalBatch, onGoBack }) => {
  return (
    <View className="mx-4 mt-4 mb-6">
      <TouchableOpacity
        onPress={onViewOriginalBatch}
        className="bg-indigo-600 rounded-xl py-3 items-center mb-3"
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-base">Xem lô hàng gốc</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onGoBack}
        className="bg-gray-300 rounded-xl py-3 items-center"
        activeOpacity={0.8}
      >
        <Text className="text-gray-700 font-bold text-base">Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;
