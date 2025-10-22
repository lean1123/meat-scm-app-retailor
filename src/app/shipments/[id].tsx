import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  ],
};

const pointA = {
  latitude: 10.7769,
  longitude: 106.6954,
};

const pointB = {
  latitude: 10.7794,
  longitude: 106.6982,
};

const ShipmentDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const shipment = FAKE_SHIPMENT;
  const [currentLocation, setCurrentLocation] = React.useState(pointA);

  const isDelivered = shipment.status === 'Đã nhận';

  return (
    <ScrollView className="flex-1 bg-gray-100" contentContainerStyle={{ padding: 16 }}>
      <SafeAreaView style={{ flex: 1, height: 400 }}>
        <MapView
          provider="google"
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            coordinate={pointB}
            title={'Điểm B'}
            description={'Vị trí kết thúc'}
            pinColor={'blue'}
          />
        </MapView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
});
