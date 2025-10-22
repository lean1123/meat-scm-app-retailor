import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IUnit, ShelfUpdateData } from '../types';

interface ShelfUpdateSectionProps {
  unit: IUnit;
  onShelfUpdate: (data: ShelfUpdateData) => void;
}

const ShelfUpdateSection: React.FC<ShelfUpdateSectionProps> = ({ unit, onShelfUpdate }) => {
  const [newLocation, setNewLocation] = useState(unit.location || '');
  const [newTemperature, setNewTemperature] = useState(unit.temperature?.toString() || '');
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    if (!newLocation.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập vị trí kệ');
      return;
    }

    const temperature = newTemperature ? parseFloat(newTemperature) : undefined;
    if (newTemperature && (isNaN(temperature!) || temperature! < -50 || temperature! > 50)) {
      Alert.alert('Lỗi', 'Nhiệt độ không hợp lệ (-50°C đến 50°C)');
      return;
    }

    const updateData: ShelfUpdateData = {
      unitId: unit.id || unit.assetID,
      location: newLocation.trim(),
      temperature,
      notes: notes.trim() || undefined,
    };

    Alert.alert('Xác nhận cập nhật', `Cập nhật vị trí kệ thành "${newLocation}"?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xác nhận',
        onPress: () => {
          onShelfUpdate(updateData);
          setIsEditing(false);
          Alert.alert('Thành công', 'Đã cập nhật vị trí kệ!');
        },
      },
    ]);
  };

  const handleCancel = () => {
    setNewLocation(unit.location || '');
    setNewTemperature(unit.temperature?.toString() || '');
    setNotes('');
    setIsEditing(false);
  };

  return (
    <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold text-gray-800">Quản lý kệ hàng</Text>
        {!isEditing && (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            className="bg-blue-100 rounded-full w-8 h-8 items-center justify-center"
          >
            <Ionicons name="create-outline" size={16} color="#2563eb" />
          </TouchableOpacity>
        )}
      </View>

      {!isEditing ? (
        <View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Vị trí hiện tại:</Text>
            <Text className="font-semibold text-gray-800">{unit.location || 'Chưa xác định'}</Text>
          </View>
          {unit.temperature !== undefined && (
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Nhiệt độ:</Text>
              <Text className="font-semibold text-gray-800">{unit.temperature}°C</Text>
            </View>
          )}
        </View>
      ) : (
        <View>
          {/* Location Input */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">Vị trí kệ mới:</Text>
            <TextInput
              value={newLocation}
              onChangeText={setNewLocation}
              placeholder="Ví dụ: Kệ A1, Tủ lạnh B2"
              className="bg-gray-50 rounded-lg py-2 px-3 border border-gray-300"
            />
          </View>

          {/* Temperature Input */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">Nhiệt độ (°C) - tùy chọn:</Text>
            <TextInput
              value={newTemperature}
              onChangeText={setNewTemperature}
              placeholder="Ví dụ: -2, 4, 25"
              keyboardType="numeric"
              className="bg-gray-50 rounded-lg py-2 px-3 border border-gray-300"
            />
          </View>

          {/* Notes */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">Ghi chú (tùy chọn):</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Lý do thay đổi vị trí"
              multiline
              numberOfLines={2}
              className="bg-gray-50 rounded-lg py-2 px-3 border border-gray-300"
            />
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 bg-gray-200 rounded-xl py-3 items-center"
              activeOpacity={0.8}
            >
              <Text className="text-gray-700 font-semibold">Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpdate}
              className="flex-1 bg-blue-600 rounded-xl py-3 items-center"
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold">Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ShelfUpdateSection;
