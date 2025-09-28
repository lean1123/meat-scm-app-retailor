import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  value: number;
  label: string;
}

const StatCard = ({ icon, color, value, label }: StatCardProps) => (
  <View className="flex-1 bg-white rounded-2xl shadow p-4 m-2 items-center justify-center">
    <Ionicons name={icon} size={32} color={color} />
    <Text className="text-2xl font-bold text-gray-800 mt-2">{value}</Text>
    <Text className="text-gray-500 text-base mt-1 text-center">{label}</Text>
  </View>
);

export default StatCard;
