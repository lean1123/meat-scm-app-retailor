import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// const FILTERS = [
//   { label: 'Tất cả', value: 'all' },
//   { label: 'Đóng Gói', value: 'PACKAGED' },
//   { label: 'Đã bán', value: 'STORED' },
// ];

// const facilityID = 'retailer-d';

const AssetScreen = () => {
  const router = useRouter();
  // const [assets, setAssets] = useState<IAsset[]>([]);
  // const [search, setSearch] = useState('');
  // const [filter, setFilter] = useState('all');

  // useEffect(() => {
  //   const fetchAssets = async () => {
  //     try {
  //       const res = await asset.fetchShipmentByFacilityID(facilityID);

  //       if (res.status !== 200) {
  //         console.error('Failed to fetch assets, status code:', res.status);
  //         setAssets([]);
  //         return;
  //       }

  //       setAssets(Array.isArray(res.data) ? res.data : []);
  //     } catch (error) {
  //       console.error('Error fetching assets:', error);
  //       setAssets([]);
  //     }
  //   };

  //   fetchAssets();
  // }, []);

  // const filteredAssets = assets?.filter((asset) => {
  //   const matchSearch =
  //     asset.productName?.toLowerCase().includes(search.toLowerCase()) ||
  //     asset.assetID?.toLowerCase().includes(search.toLowerCase());
  //   const matchFilter = filter === 'all' ? true : asset.status === filter;
  //   return matchSearch && matchFilter;
  // });

  const [newPrefixID, setNewPrefixID] = useState<string | null>('hehe');

  useEffect(() => {
    const getNewPrefixID = async () => {
      const storedPrefixID = await AsyncStorage.getItem('newPrefixID');
      if (storedPrefixID) {
        setNewPrefixID(storedPrefixID);
      }
    };

    getNewPrefixID();
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      <View className="pt-9 pb-4 bg-white items-center border-b border-gray-200">
        <Text className="text-2xl font-bold text-primary">Kho Hàng Của Bạn</Text>
      </View>

      {/* <View className="bg-white px-4 py-3 border-b border-gray-200">
        <TextInput
          placeholder="Tìm kiếm theo tên, mã lô..."
          value={search}
          onChangeText={setSearch}
          className="bg-gray-100 rounded-xl py-2 px-4 text-base border border-gray-300"
        />
      </View>

      <View className="bg-white px-4 py-2 border-b border-gray-200">
        <Text className="text-primary mb-1 ml-2 font-semibold">Lọc theo trạng thái:</Text>
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
        data={assets}
        keyExtractor={(item) => item.assetID}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <TouchableOpacity
              onPress={() => router.push(`/asset/${item?.shipmentID}`)}
              activeOpacity={0.7}
            >
              <Text className="text-lg font-bold text-gray-800 mb-1">{item?.productName}</Text>
              <Text className="text-gray-600">ID: {item?.assetID}</Text>
              <Text className="text-gray-600">
                Số lượng: {item?.currentQuantity?.value} {item?.currentQuantity?.unit}
              </Text>
              {item?.parentAssetIDs && item.parentAssetIDs.length > 0 && (
                <Text className="text-gray-600">Mã lô gốc: {item?.parentAssetIDs?.join(', ')}</Text>
              )}
              <Text
                className={
                  item.status !== 'STORED'
                    ? 'text-red-500 font-semibold'
                    : 'text-green-500 font-semibold'
                }
              >
                Trạng thái:{' '}
                {item.status === 'PACKAGED' ? 'Đóng Gói' : item.status === 'STORED' ? 'Đã bán' : ''}
              </Text>
            </TouchableOpacity>

            {/* Nếu có  */}
      {/* {item?.status === 'Đang vận chuyển' && (
              <TouchableOpacity
                onPress={() => router.push(`/shipments/${item.assetID}`)}
                className="mt-2 bg-indigo-600 rounded-lg py-2 items-center"
                activeOpacity={0.8}
              >
                <Text className="text-white font-bold text-base">Xem vị trí hiện tại</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-600 mt-8">Không tìm thấy Asset phù hợp.</Text>
        } */}
      {/* /> */}

      <View className="flex-1 justify-center items-center px-4">
        {newPrefixID && (
          <TouchableOpacity
            onPress={() => router.push(`/asset/${newPrefixID}`)}
            className="mb-6 bg-white rounded-lg py-4 px-8"
          >
            <Text className="text-center text-gray-600">
              Mã lô hàng mới nhận: <Text className="font-bold">{newPrefixID}</Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AssetScreen;
