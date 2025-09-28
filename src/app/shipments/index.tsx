import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const FAKE_SHIPMENTS = [
  { id: 'SHP-001', name: 'Chuyến hàng 1', status: 'Đang vận chuyển', from: 'Kho tổng A' },
  { id: 'SHP-002', name: 'Chuyến hàng 2', status: 'Đã nhận', from: 'Nhà cung cấp B' },
  { id: 'SHP-003', name: 'Chuyến hàng 3', status: 'Đã gửi đi', from: 'Kho tổng C' },
  { id: 'SHP-004', name: 'Chuyến hàng 4', status: 'Đang vận chuyển', from: 'Nhà cung cấp D' },
  { id: 'SHP-005', name: 'Chuyến hàng 5', status: 'Đã nhận', from: 'Kho tổng E' },
];

const FILTERS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đang vận chuyển', value: 'Đang vận chuyển' },
  { label: 'Đã nhận', value: 'Đã nhận' },
  { label: 'Đã gửi đi', value: 'Đã gửi đi' },
];

const ShipmentScreen = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredShipments = FAKE_SHIPMENTS.filter((shipment) => {
    const matchSearch =
      shipment.name.toLowerCase().includes(search.toLowerCase()) ||
      shipment.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' ? true : shipment.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <View className="flex-1 bg-gray-100">
      <View className="pt-9 pb-4 bg-white items-center border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">Danh sách lô hàng</Text>
      </View>

      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <TextInput
          placeholder="Tìm kiếm theo tên, mã chuyến..."
          value={search}
          onChangeText={setSearch}
          className="bg-gray-100 rounded-xl py-2.5 px-4 text-base border border-gray-200"
        />
      </View>

      <View className="bg-white px-4 py-2.5 border-b border-gray-200">
        <Text className="font-bold mb-1.5">Lọc trạng thái:</Text>
        <View className="flex-row">
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.value}
              onPress={() => setFilter(f.value)}
              className={`min-w-[90px] py-2 px-4 rounded-full bg-gray-100 mr-2 border-2 border-gray-200 items-center justify-center flex-row ${filter === f.value ? 'bg-indigo-600 border-indigo-600' : ''}`}
              activeOpacity={0.8}
            >
              <Text
                className={`font-bold text-base text-center ${filter === f.value ? 'text-white' : 'text-gray-800'}`}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredShipments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/shipments/${item.id}`)}
            className="bg-white rounded-xl p-4 mb-3 shadow-sm"
            activeOpacity={0.7}
          >
            <Text className="text-lg font-bold text-gray-800 mb-0.5">{item.name}</Text>
            <Text className="text-gray-500 mb-0.5">ID: {item.id}</Text>
            <Text className="text-gray-700 mb-0.5 font-bold">Trạng thái: {item.status}</Text>
            <Text className="text-indigo-500 mb-0.5">Từ: {item.from}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-8">
            Không tìm thấy chuyến hàng phù hợp.
          </Text>
        }
      />
    </View>
  );
};

export default ShipmentScreen;
