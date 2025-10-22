import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IUnit, SaleTransaction } from '../types';

interface SalesSectionProps {
  unit: IUnit;
  onSell: (transaction: SaleTransaction) => void;
  formatPrice: (price?: number) => string;
}

const SalesSection: React.FC<SalesSectionProps> = ({ unit, onSell, formatPrice }) => {
  const [sellQuantity, setSellQuantity] = useState(1);
  const [customerInfo, setCustomerInfo] = useState('');
  const [notes, setNotes] = useState('');

  if (unit.status !== 'available' || !unit.currentQuantity || unit.currentQuantity.value <= 0) {
    return null;
  }

  const handleSell = () => {
    if (sellQuantity <= 0 || sellQuantity > unit.currentQuantity!.value) {
      Alert.alert('Lỗi', 'Số lượng bán không hợp lệ');
      return;
    }

    const transaction: SaleTransaction = {
      unitId: unit.id || unit.assetID,
      quantity: {
        unit: unit.currentQuantity!.unit,
        value: sellQuantity,
      },
      price: (unit.price || 0) * sellQuantity,
      customerInfo: customerInfo.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    Alert.alert(
      'Xác nhận bán hàng',
      `Bán ${sellQuantity} ${unit.currentQuantity!.unit} ${unit.productName}?\nTổng tiền: ${formatPrice(
        transaction.price,
      )}`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận',
          onPress: () => {
            onSell(transaction);
            Alert.alert('Thành công', 'Đã bán hàng thành công!');
          },
        },
      ],
    );
  };

  const maxQuantity = unit.currentQuantity.value;
  const totalPrice = (unit.price || 0) * sellQuantity;

  return (
    <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-800 mb-3">Bán hàng</Text>

      {/* Quantity Selector */}
      <View className="mb-4">
        <Text className="text-gray-600 mb-2">Số lượng bán:</Text>
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => setSellQuantity(Math.max(1, sellQuantity - 1))}
            className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
          >
            <Ionicons name="remove" size={16} color="#374151" />
          </TouchableOpacity>
          <Text className="mx-4 text-lg font-semibold">
            {sellQuantity} {unit.currentQuantity.unit}
          </Text>
          <TouchableOpacity
            onPress={() => setSellQuantity(Math.min(maxQuantity, sellQuantity + 1))}
            className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
          >
            <Ionicons name="add" size={16} color="#374151" />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-400 text-sm mt-1">
          Tối đa: {maxQuantity} {unit.currentQuantity.unit}
        </Text>
      </View>

      {/* Customer Info */}
      <View className="mb-4">
        <Text className="text-gray-600 mb-2">Thông tin khách hàng (tùy chọn):</Text>
        <TextInput
          value={customerInfo}
          onChangeText={setCustomerInfo}
          placeholder="Tên khách hàng hoặc SĐT"
          className="bg-gray-50 rounded-lg py-2 px-3 border border-gray-300"
        />
      </View>

      {/* Notes */}
      <View className="mb-4">
        <Text className="text-gray-600 mb-2">Ghi chú (tùy chọn):</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Ghi chú về giao dịch"
          multiline
          numberOfLines={2}
          className="bg-gray-50 rounded-lg py-2 px-3 border border-gray-300"
        />
      </View>

      {/* Total Price */}
      <View className="flex-row justify-between mb-4">
        <Text className="text-gray-600">Tổng tiền:</Text>
        <Text className="text-xl font-bold text-green-600">{formatPrice(totalPrice)}</Text>
      </View>

      {/* Sell Button */}
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

export default SalesSection;
