import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const FAKE_ASSETS = [
  {
    id: 'BATCH-001',
    name: 'Lô hàng 1',
    shipmentId: 'SHP-001',
    type: 'Thịt bò',
    status: 'Đã lưu kho',
  },
  { id: 'BATCH-002', name: 'Lô hàng 2', shipmentId: 'SHP-002', type: 'Thịt heo', status: 'Đã bán' },
  {
    id: 'BATCH-003',
    name: 'Lô hàng 3',
    shipmentId: 'SHP-003',
    type: 'Thịt gà',
    status: 'Đã lưu kho',
  },
  { id: 'BATCH-004', name: 'Lô hàng 4', shipmentId: 'SHP-004', type: 'Thịt bò', status: 'Đã bán' },
  {
    id: 'BATCH-005',
    name: 'Lô hàng 5',
    shipmentId: 'SHP-005',
    type: 'Thịt heo',
    status: 'Đã lưu kho',
  },
];

const FILTERS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đã lưu kho', value: 'Đã lưu kho' },
  { label: 'Đã bán', value: 'Đã bán' },
];

const AssetScreen = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredAssets = FAKE_ASSETS.filter((asset) => {
    const matchSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' ? true : asset.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <View className="flex-1 bg-gray-100">
      <View className="pt-9 pb-4 bg-white items-center border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">Kho hàng</Text>
      </View>

      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <TextInput
          placeholder="Tìm kiếm theo tên, mã lô..."
          value={search}
          onChangeText={setSearch}
          className="bg-gray-100 rounded-xl py-2 px-4 text-base border border-gray-300"
        />
      </View>

      <View className="bg-white px-4 py-2 border-b border-gray-200">
        <Picker
          selectedValue={filter}
          onValueChange={setFilter}
          style={{ height: 50, width: '100%' }}
        >
          {FILTERS.map((f) => (
            <Picker.Item key={f.value} label={f.label} value={f.value} />
          ))}
        </Picker>
      </View>

      <FlatList
        data={filteredAssets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <TouchableOpacity onPress={() => router.push(`/asset/${item.id}`)} activeOpacity={0.7}>
              <Text className="text-lg font-bold text-gray-800 mb-1">{item.name}</Text>
              <Text className="text-gray-500">ID: {item.id}</Text>
              <Text className="text-gray-600">Loại: {item.type}</Text>
              <Text
                className={
                  item.status === 'Đã bán'
                    ? 'text-red-500 font-semibold'
                    : 'text-green-500 font-semibold'
                }
              >
                Trạng thái: {item.status}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push(`/shipments/${item.shipmentId}`)}
              className="mt-2 bg-indigo-600 rounded-lg py-2 items-center"
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-base">Xem lịch sử lô hàng</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-8">Không tìm thấy tài sản phù hợp.</Text>
        }
      />
    </View>
  );
};

export default AssetScreen;
