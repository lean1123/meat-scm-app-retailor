import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { UnitHistory } from '../types';

interface UnitHistoryTimelineProps {
  history: UnitHistory[];
  formatDate: (date: string) => string;
  formatTime: (date: string) => string;
}

const UnitHistoryTimeline: React.FC<UnitHistoryTimelineProps> = ({
  history,
  formatDate,
  formatTime,
}) => {
  const getActionIcon = (action: UnitHistory['action']) => {
    switch (action) {
      case 'created':
        return 'add-circle';
      case 'moved':
        return 'location';
      case 'sold':
        return 'cash';
      case 'updated':
        return 'create';
      case 'damaged':
        return 'warning';
      default:
        return 'ellipse';
    }
  };

  const getActionColor = (action: UnitHistory['action']) => {
    switch (action) {
      case 'created':
        return 'text-green-600';
      case 'moved':
        return 'text-blue-600';
      case 'sold':
        return 'text-purple-600';
      case 'updated':
        return 'text-orange-600';
      case 'damaged':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getActionBackgroundColor = (action: UnitHistory['action']) => {
    switch (action) {
      case 'created':
        return 'bg-green-100';
      case 'moved':
        return 'bg-blue-100';
      case 'sold':
        return 'bg-purple-100';
      case 'updated':
        return 'bg-orange-100';
      case 'damaged':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getActionLabel = (action: UnitHistory['action']) => {
    switch (action) {
      case 'created':
        return 'Tạo mới';
      case 'moved':
        return 'Di chuyển';
      case 'sold':
        return 'Bán hàng';
      case 'updated':
        return 'Cập nhật';
      case 'damaged':
        return 'Hư hỏng';
      default:
        return 'Khác';
    }
  };

  if (!history || history.length === 0) {
    return (
      <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-3">Lịch sử hoạt động</Text>
        <View className="items-center py-8">
          <Ionicons name="time-outline" size={48} color="#9ca3af" />
          <Text className="text-gray-500 mt-2">Chưa có hoạt động nào</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-800 mb-4">Lịch sử hoạt động</Text>

      <ScrollView className="max-h-96">
        {history.map((item, index) => (
          <View key={item.id} className="flex-row mb-4 last:mb-0">
            {/* Timeline Icon */}
            <View className="items-center mr-3">
              <View
                className={`${getActionBackgroundColor(
                  item.action,
                )} rounded-full w-10 h-10 items-center justify-center`}
              >
                <Ionicons
                  name={getActionIcon(item.action) as any}
                  size={20}
                  color={getActionColor(item.action).replace('text-', '#')}
                />
              </View>
              {index < history.length - 1 && (
                <View className="w-0.5 bg-gray-200 flex-1 mt-2" style={{ minHeight: 20 }} />
              )}
            </View>

            {/* Content */}
            <View className="flex-1">
              {/* Header */}
              <View className="flex-row justify-between items-start mb-1">
                <Text className={`font-semibold ${getActionColor(item.action)}`}>
                  {getActionLabel(item.action)}
                </Text>
                <View className="items-end">
                  <Text className="text-gray-500 text-xs">{formatDate(item.timestamp)}</Text>
                  <Text className="text-gray-400 text-xs">{formatTime(item.timestamp)}</Text>
                </View>
              </View>

              {/* Description */}
              <Text className="text-gray-700 mb-2">{item.description}</Text>

              {/* Details */}
              <View className="space-y-1">
                {item.location && (
                  <View className="flex-row">
                    <Text className="text-gray-500 text-sm w-20">Vị trí:</Text>
                    <Text className="text-gray-700 text-sm flex-1">{item.location}</Text>
                  </View>
                )}
                {item.quantity && (
                  <View className="flex-row">
                    <Text className="text-gray-500 text-sm w-20">Số lượng:</Text>
                    <Text className="text-gray-700 text-sm flex-1">
                      {item.quantity.value} {item.quantity.unit}
                    </Text>
                  </View>
                )}
                {item.performedBy && (
                  <View className="flex-row">
                    <Text className="text-gray-500 text-sm w-20">Người thực hiện:</Text>
                    <Text className="text-gray-700 text-sm flex-1">{item.performedBy}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default UnitHistoryTimeline;
