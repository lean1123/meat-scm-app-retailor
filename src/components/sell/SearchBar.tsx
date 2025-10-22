import { View, TextInput } from 'react-native';
import React from 'react';

interface SearchBarProps {
  search: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  onSearchChange,
  placeholder = 'Tìm kiếm...',
}) => {
  return (
    <View className="bg-white px-4 py-3 border-b border-gray-200">
      <TextInput
        placeholder={placeholder}
        value={search}
        onChangeText={onSearchChange}
        className="bg-gray-100 rounded-xl py-2 px-4 text-base border border-gray-300"
      />
    </View>
  );
};

export default SearchBar;
