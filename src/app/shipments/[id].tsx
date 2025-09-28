import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapWithRoute from '@/src/components/map/MapWithRoute';

// Fake data cho demo
const FAKE_SHIPMENT = {
  id: 'SHP-001',
  name: 'Chuyến hàng 1',
  status: 'Đang vận chuyển',
  from: 'Kho tổng A',
  to: 'Cửa hàng B',
  currentLocation: 'Kho tổng A',
  history: [
    { time: '2025-09-15 08:00', location: 'Kho tổng A', status: 'Đã xuất kho' },
    { time: '2025-09-15 10:00', location: 'Trên đường', status: 'Đang vận chuyển' },
    // Nếu đã nhận thì thêm trạng thái nhận
    // { time: '2025-09-15 12:00', location: 'Cửa hàng B', status: 'Đã nhận' },
  ],
};

const ShipmentDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const shipment = FAKE_SHIPMENT; // Thay bằng fetch theo id nếu có API

  // Kiểm tra trạng thái để xác định timeline
  const isDelivered = shipment.status === 'Đã nhận';

  return (
    <ScrollView className="flex-1 bg-gray-100" contentContainerStyle={{ padding: 16 }}>
      {/* <View className="bg-white rounded-xl p-4 mb-2 shadow-sm">
        
      </View> */}

      <SafeAreaView style={{ flex: 1 }}>
        <MapWithRoute />
      </SafeAreaView>

      <Text className="text-lg font-bold my-4">Lịch sử vận chuyển</Text>
      <Text className="text-gray-800 text-base mb-1">{shipment.id}</Text>
      <View className="mt-2 mb-6 pl-3 border-l-2 border-gray-200">
        {shipment.history.map((step, idx) => (
          <View key={idx} className="flex-row items-start mb-4 relative">
            <View className="w-4 h-4 rounded-full bg-indigo-600 mr-3 mt-0.5" />
            <View className="flex-1">
              <Text className="font-bold text-base text-gray-800">{step.status}</Text>
              <Text className="text-gray-600 text-[15px]">{step.location}</Text>
              <Text className="text-gray-400 text-[13px]">{step.time}</Text>
            </View>
            {idx < shipment.history.length - 1 && (
              <View
                style={{
                  position: 'absolute',
                  left: 14,
                  top: 18,
                  width: 2,
                  height: 18,
                  backgroundColor: '#E5E7EB',
                  zIndex: -1,
                }}
              />
            )}
          </View>
        ))}
        {!isDelivered && (
          <View className="flex-row items-start mb-4 relative">
            <View className="w-4 h-4 rounded-full bg-indigo-400 mr-3 mt-0.5" />
            <View className="flex-1">
              <Text className="font-bold text-base text-indigo-500">Đang ở vị trí hiện tại</Text>
              <Text className="text-gray-600 text-[15px]">{shipment.currentLocation}</Text>
              <Text className="text-gray-400 text-[13px]">Chưa giao tới</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ShipmentDetail;
