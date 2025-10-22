import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IUnit, ParentTraceResult } from '../types';

interface ParentTraceSectionProps {
  unit: IUnit;
  onTraceParent: (unitId: string) => Promise<ParentTraceResult>;
  formatDate: (date: string) => string;
}

const ParentTraceSection: React.FC<ParentTraceSectionProps> = ({
  unit,
  onTraceParent,
  formatDate,
}) => {
  const [traceResult, setTraceResult] = useState<ParentTraceResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTrace = async () => {
    if (!unit.parentAssetIDs || unit.parentAssetIDs.length === 0) {
      Alert.alert('Thông báo', 'Sản phẩm này không có dữ liệu nguồn gốc');
      return;
    }

    setIsLoading(true);
    try {
      const result = await onTraceParent(unit.id || unit.assetID);
      setTraceResult(result);
      setIsExpanded(true);
    } catch (error: any) {
      console.error('Parent trace error:', error);
      Alert.alert('Lỗi', 'Không thể truy xuất nguồn gốc');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold text-gray-800">Truy xuất nguồn gốc</Text>
        <TouchableOpacity
          onPress={isExpanded ? () => setIsExpanded(false) : handleTrace}
          disabled={isLoading}
          className={`${
            isExpanded ? 'bg-gray-100' : 'bg-blue-100'
          } rounded-full w-8 h-8 items-center justify-center`}
        >
          {isLoading ? (
            <Ionicons name="refresh" size={16} color="#6b7280" />
          ) : (
            <Ionicons
              name={isExpanded ? 'chevron-up' : 'search'}
              size={16}
              color={isExpanded ? '#6b7280' : '#2563eb'}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Basic Info */}
      <View className="mb-3">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Sản phẩm gốc:</Text>
          <Text className="font-semibold text-gray-800">
            {unit.parentAssetIDs && unit.parentAssetIDs.length > 0 ? 'Có' : 'Không'}
          </Text>
        </View>
        {unit.parentAssetIDs && unit.parentAssetIDs.length > 0 && (
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Số lượng nguồn:</Text>
            <Text className="font-semibold text-gray-800">{unit.parentAssetIDs.length}</Text>
          </View>
        )}
      </View>

      {/* Trace Button */}
      {!isExpanded && unit.parentAssetIDs && unit.parentAssetIDs.length > 0 && (
        <TouchableOpacity
          onPress={handleTrace}
          disabled={isLoading}
          className="bg-blue-600 rounded-xl py-3 items-center"
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold">
            {isLoading ? 'Đang truy xuất...' : 'Truy xuất nguồn gốc'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Trace Results */}
      {isExpanded && traceResult && (
        <View className="mt-3 border-t border-gray-200 pt-3">
          <ScrollView className="max-h-64">
            {/* Shipment Info */}
            <View className="bg-gray-50 rounded-lg p-3 mb-3">
              <Text className="font-semibold text-gray-800 mb-2">Thông tin lô hàng</Text>
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-600">Mã lô:</Text>
                <Text className="font-medium">{traceResult.shipmentBatch}</Text>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-600">Mã giao hàng:</Text>
                <Text className="font-medium">{traceResult.shipmentId}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Nguồn gốc:</Text>
                <Text className="font-medium">{traceResult.origin}</Text>
              </View>
            </View>

            {/* Parent Asset */}
            <View className="bg-gray-50 rounded-lg p-3 mb-3">
              <Text className="font-semibold text-gray-800 mb-2">Sản phẩm gốc</Text>
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Mã sản phẩm:</Text>
                <Text className="font-medium">{traceResult.parentAssetId}</Text>
              </View>
            </View>

            {/* Split History */}
            {traceResult.splitHistory && traceResult.splitHistory.length > 0 && (
              <View className="bg-gray-50 rounded-lg p-3">
                <Text className="font-semibold text-gray-800 mb-2">Lịch sử chia tách</Text>
                {traceResult.splitHistory.map((split, index) => (
                  <View key={index} className="mb-2 last:mb-0">
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-gray-600">Thời gian:</Text>
                      <Text className="font-medium">{formatDate(split.timestamp)}</Text>
                    </View>
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-gray-600">Từ - Đến:</Text>
                      <Text className="font-medium">
                        {split.fromQuantity} → {split.toQuantity}
                      </Text>
                    </View>
                    {split.notes && (
                      <View className="flex-row justify-between">
                        <Text className="text-gray-600">Ghi chú:</Text>
                        <Text className="font-medium flex-1 text-right">{split.notes}</Text>
                      </View>
                    )}
                    {index < traceResult.splitHistory!.length - 1 && (
                      <View className="border-b border-gray-200 my-2" />
                    )}
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          {/* Collapse Button */}
          <TouchableOpacity
            onPress={() => setIsExpanded(false)}
            className="bg-gray-200 rounded-xl py-2 items-center mt-3"
            activeOpacity={0.8}
          >
            <Text className="text-gray-700 font-semibold">Thu gọn</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ParentTraceSection;
