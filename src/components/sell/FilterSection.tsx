import { View, Text } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { FilterOption } from './types';

interface FilterSectionProps {
  showFilters: boolean;
  dateFilter: string;
  expiryFilter: string;
  statusFilter: string;
  onDateFilterChange: (value: string) => void;
  onExpiryFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  dateFilters: FilterOption[];
  expiryFilters: FilterOption[];
  statusFilters: FilterOption[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  showFilters,
  dateFilter,
  expiryFilter,
  statusFilter,
  onDateFilterChange,
  onExpiryFilterChange,
  onStatusFilterChange,
  dateFilters,
  expiryFilters,
  statusFilters,
}) => {
  if (!showFilters) return null;

  return (
    <View className="bg-white border-b border-gray-200 p-4">
      <View className="mb-4">
        <Text className="text-sm font-semibold text-secondary mb-2">Ngày tách:</Text>
        <View className="border border-gray-300 rounded-lg bg-background">
          <Picker
            selectedValue={dateFilter}
            onValueChange={onDateFilterChange}
            style={{ height: 50 }}
          >
            {dateFilters.map((filter) => (
              <Picker.Item key={filter.value} label={filter.label} value={filter.value} />
            ))}
          </Picker>
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-secondary mb-2">Hạn sử dụng:</Text>
        <View className="border border-gray-300 rounded-lg bg-background">
          <Picker
            selectedValue={expiryFilter}
            onValueChange={onExpiryFilterChange}
            style={{ height: 50 }}
          >
            {expiryFilters.map((filter) => (
              <Picker.Item key={filter.value} label={filter.label} value={filter.value} />
            ))}
          </Picker>
        </View>
      </View>

      <View className="mb-2">
        <Text className="text-sm font-semibold text-secondary mb-2">Trạng thái:</Text>
        <View className="border border-gray-300 rounded-lg bg-background">
          <Picker
            selectedValue={statusFilter}
            onValueChange={onStatusFilterChange}
            style={{ height: 50 }}
          >
            {statusFilters.map((filter) => (
              <Picker.Item key={filter.value} label={filter.label} value={filter.value} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default FilterSection;
