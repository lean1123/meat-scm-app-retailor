import { ActivityIndicator, ScrollView, Alert, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import AssetInfoCard from '../../components/asset/detail/AssetInfoCard';
import AssetActionButtons from '../../components/asset/detail/AssetActionButtons';
import AssetModals from '../../components/asset/detail/AssetModals';
import ProductList from '../../components/asset/detail/ProductList';

interface StorageDetails {
  ownerOrgName: string;
  facilityName: string;
  note: string;
}

interface BatchData {
  id: string;
  shipmentId: string;
  createdAt: string;
  storage?: StorageDetails;
  units?: string[];
}

// FAKE DATA for demo
const FAKE_BATCH_DATA: BatchData = {
  id: 'BATCH-001',
  shipmentId: 'SHP-001',
  createdAt: new Date().toISOString(),
  storage: {
    ownerOrgName: 'Siêu thị An Toàn',
    facilityName: 'Cửa hàng An Toàn 01',
    note: '',
  },
  units: [],
};

const AssetDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [batchData, setBatchData] = useState<BatchData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isUpdateStorageModalVisible, setUpdateStorageModalVisible] = useState(false);
  const [isSplitModalVisible, setSplitModalVisible] = useState(false);

  const [storageDetails, setStorageDetails] = useState<StorageDetails>({
    ownerOrgName: 'Siêu thị An Toàn',
    facilityName: 'Cửa hàng An Toàn 01',
    note: '',
  });
  const [splitDetails, setSplitDetails] = useState({
    unitCount: '50',
    unitIDPrefix: 'UNIT-TB-101-',
  });

  useEffect(() => {
    const fetchBatchDetails = async () => {
      setIsLoading(true);
      console.log(`Fetching details for batch: ${id}`);
      // --- THAY THẾ BẰNG API THẬT Ở ĐÂY ---
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBatchData(FAKE_BATCH_DATA);
      setIsLoading(false);
    };

    if (id) {
      fetchBatchDetails();
    }
  }, [id]);

  const handleUpdateStorage = async () => {
    if (!storageDetails.note) {
      Alert.alert('Lỗi', 'Vui lòng nhập ghi chú vị trí kho.');
      return;
    }
    console.log('Calling API: Update Batch Storage with', storageDetails);
    // --- GỌI API THẬT Ở ĐÂY ---
    setBatchData((prev) => (prev ? { ...prev, storage: storageDetails } : null));
    setUpdateStorageModalVisible(false);
    Alert.alert('Thành công', 'Đã cập nhật vị trí lưu kho.');
  };

  const handleSplitToUnits = async () => {
    const unitCount = parseInt(splitDetails.unitCount, 10);
    if (isNaN(unitCount) || unitCount <= 0) {
      Alert.alert('Lỗi', 'Số lượng sản phẩm phải là một số dương.');
      return;
    }
    console.log('Calling API: Split to Units with', splitDetails);
    // --- GỌI API THẬT Ở ĐÂY ---

    const newUnits = Array.from({ length: 3 }, (_, i) => `${splitDetails.unitIDPrefix}${i}`);

    setBatchData((prev) => (prev ? { ...prev, units: newUnits } : null));
    setSplitModalVisible(false);
    Alert.alert('Thành công', `Đã tách thành công ${newUnits.length} sản phẩm.`);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4F46E5" className="flex-1" />;
  }

  if (!batchData) {
    return <Text className="text-center mt-10">Không tìm thấy thông tin lô hàng.</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Stack.Screen options={{ title: `Lô hàng: ${id}` }} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <AssetInfoCard batchData={batchData} />
        <AssetActionButtons
          onUpdateStorage={() => setUpdateStorageModalVisible(true)}
          onSplitUnits={() => setSplitModalVisible(true)}
          splitDisabled={!!(batchData.units && batchData.units.length > 0)}
        />
        {Array.isArray(batchData.units) && batchData.units.length > 0 && (
          <ProductList units={batchData.units} />
        )}
      </ScrollView>

      <AssetModals
        isUpdateStorageModalVisible={isUpdateStorageModalVisible}
        setUpdateStorageModalVisible={setUpdateStorageModalVisible}
        storageDetails={storageDetails}
        setStorageDetails={setStorageDetails}
        handleUpdateStorage={handleUpdateStorage}
        isSplitModalVisible={isSplitModalVisible}
        setSplitModalVisible={setSplitModalVisible}
        splitDetails={splitDetails}
        setSplitDetails={setSplitDetails}
        handleSplitToUnits={handleSplitToUnits}
      />
    </SafeAreaView>
  );
};

export default AssetDetail;
