import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface UnitInfo {
  id: string;
  assetID: string;
  productName: string;
  status: string;
  createdAt: string;
}

interface ProductListProps {
  units: UnitInfo[];
}

const ProductList: React.FC<ProductListProps> = ({ units }) => {
  const handleUnitPress = (unitId: string) => {
    console.log(`Navigating to unit: ${unitId}`);
    router.push(`/unit/${unitId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'sold':
        return 'text-blue-600 bg-blue-100';
      case 'reserved':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'Có sẵn';
      case 'sold':
        return 'Đã bán';
      case 'reserved':
        return 'Đã đặt';
      default:
        return status || 'Không xác định';
    }
  };

  return (
    <View className="mt-8">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        Danh sách sản phẩm ({units.length})
      </Text>
      <View className="bg-white rounded-2xl shadow-md p-4">
        {units.map((unit, index) => (
          <TouchableOpacity
            key={unit.id}
            onPress={() => handleUnitPress(unit.id)}
            className={`flex-row items-center justify-between py-4 px-2 ${index < units.length - 1 ? 'border-b border-gray-200' : ''}`}
            activeOpacity={0.7}
          >
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-800">{unit.id}</Text>
              <Text className="text-sm text-gray-600 mt-1">{unit.productName}</Text>
              <Text className="text-xs text-gray-400 mt-1">
                Tạo: {new Date(unit.createdAt).toLocaleDateString('vi-VN')}
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className={`px-2 py-1 rounded-full mr-3 ${getStatusColor(unit.status)}`}>
                <Text
                  className={`text-xs font-medium ${getStatusColor(unit.status).split(' ')[0]}`}
                >
                  {getStatusText(unit.status)}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6b7280" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProductList;
