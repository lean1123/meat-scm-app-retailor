import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface FilterToggleProps {
  showFilters: boolean;
  onToggle: () => void;
}

const FilterToggle: React.FC<FilterToggleProps> = ({ showFilters, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className="bg-white px-4 py-3 border-b border-gray-200 flex-row justify-between items-center"
      activeOpacity={0.7}
    >
      <Text className="text-primary font-semibold">Bộ lọc</Text>
      <Ionicons name={showFilters ? 'chevron-up' : 'chevron-down'} size={20} color="#374151" />
    </TouchableOpacity>
  );
};

export default FilterToggle;
