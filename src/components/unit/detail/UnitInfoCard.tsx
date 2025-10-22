import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IUnit } from '../types';
import { isExpiringSoon, formatQuantity } from '../utils';

interface UnitInfoCardProps {
  unit: IUnit;
  formatPrice: (price?: number) => string;
}

const UnitInfoCard: React.FC<UnitInfoCardProps> = ({ unit, formatPrice }) => {
  return (
    <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-800 mb-3">Thông tin sản phẩm</Text>

      <View className="space-y-3">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Tên sản phẩm:</Text>
          <Text className="font-semibold text-gray-800 flex-1 text-right">
            {unit.productName || 'N/A'}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Mã lô:</Text>
          <Text className="font-semibold text-gray-800">{unit.batchCode || 'N/A'}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Số lượng gốc:</Text>
          <Text className="font-semibold text-gray-800">
            {formatQuantity(unit.originalQuantity)}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Số lượng hiện tại:</Text>
          <Text className="font-semibold text-gray-800">
            {formatQuantity(unit.currentQuantity)}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Giá bán:</Text>
          <Text className="font-semibold text-green-600">{formatPrice(unit.price)}</Text>
        </View>

        {unit.expiryDate && (
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Hạn sử dụng:</Text>
            <View className="flex-row items-center">
              <Text
                className={`font-semibold ${
                  isExpiringSoon(unit.expiryDate) ? 'text-red-500' : 'text-gray-800'
                }`}
              >
                {new Date(unit.expiryDate).toLocaleDateString('vi-VN')}
              </Text>
              {isExpiringSoon(unit.expiryDate) && (
                <Ionicons name="warning" size={16} color="#ef4444" className="ml-1" />
              )}
            </View>
          </View>
        )}

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Vị trí kệ:</Text>
          <Text className="font-semibold text-indigo-600">{unit.shelf || 'Chưa xếp kệ'}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Khu vực:</Text>
          <Text className="font-semibold text-gray-800">{unit.location || 'N/A'}</Text>
        </View>

        {unit.temperature && (
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Nhiệt độ bảo quản:</Text>
            <Text className="font-semibold text-blue-600">{unit.temperature}°C</Text>
          </View>
        )}

        {unit.description && (
          <View className="mt-2">
            <Text className="text-gray-600 mb-1">Mô tả:</Text>
            <Text className="font-medium text-gray-800">{unit.description}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default UnitInfoCard;
