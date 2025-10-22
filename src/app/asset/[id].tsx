import { ActivityIndicator, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import AssetInfoCard from '../../components/asset/detail/AssetInfoCard';
import AssetActionButtons from '../../components/asset/detail/AssetActionButtons';
import AssetModals from '../../components/asset/detail/AssetModals';
import ProductList from '../../components/asset/detail/ProductList';
import { genId } from '@/src/hellpers/genID';
import { asset } from '@/src/api/retailorApi';

interface StorageDetails {
  ownerOrgName: string;
  facilityName: string;
  note: string;
}

interface UnitInfo {
  id: string;
  assetID: string;
  productName: string;
  status: string;
  createdAt: string;
}

interface BatchData {
  id: string;
  shipmentId: string;
  createdAt: string;
  productName?: string;
  storage?: StorageDetails;
  units?: UnitInfo[];
}

// FAKE DATA for demo
const FAKE_BATCH_DATA: BatchData = {
  id: 'BATCH-001',
  shipmentId: 'SHP-001',
  createdAt: new Date().toISOString(),
  productName: 'Thịt bò Wagyu A5',
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
  const [isLoading, setIsLoading] = useState(false);

  const unitIDPrefix = genId();

  // Storage modal state
  const [isUpdateStorageModalVisible, setUpdateStorageModalVisible] = useState(false);
  const [storageDetails, setStorageDetails] = useState<StorageDetails>({
    ownerOrgName: '',
    facilityName: '',
    note: '',
  });

  // Split modal state
  const [isSplitModalVisible, setSplitModalVisible] = useState(false);
  const [splitDetails, setSplitDetails] = useState({
    unitCount: '1',
    unitIDPrefix: unitIDPrefix,
    parentAssetID: '',
  });

  // Initialize fake batch data from route param (use param as fake batch id)
  useEffect(() => {
    if (id) {
      setBatchData({ ...FAKE_BATCH_DATA, id });
      // set storage from new batch data
      setStorageDetails(
        (FAKE_BATCH_DATA.storage as StorageDetails) || {
          ownerOrgName: '',
          facilityName: '',
          note: '',
        },
      );
      // set default parentAssetID for split to include the param
      setSplitDetails((prev) => ({ ...prev, parentAssetID: `${id}-0` }));
    } else {
      setBatchData(FAKE_BATCH_DATA);
    }
  }, [id]);

  useEffect(() => {
    // initialize storage details from batchData
    if (batchData && batchData.storage) {
      setStorageDetails(batchData.storage);
    }
  }, [batchData]);

  const handleUpdateStorage = async () => {
    // Validate
    if (!storageDetails.ownerOrgName || !storageDetails.facilityName) {
      Alert.alert('Lỗi', 'Vui lòng điền tên tổ chức và tên cơ sở.');
      return;
    }

    // simulate API call
    // xu ly 1 tray
    setIsLoading(true);
    await asset.updateStorage(id + '-0', storageDetails);
    setBatchData((prev) => (prev ? { ...prev, storage: storageDetails } : prev));
    setIsLoading(false);
    setUpdateStorageModalVisible(false);
    Alert.alert('Thành công', 'Đã cập nhật thông tin vị trí kho.');
  };

  const handleSplitToUnits = async () => {
    const unitCount = parseInt(splitDetails.unitCount, 0);
    if (isNaN(unitCount) || unitCount <= 0) {
      Alert.alert('Lỗi', 'Số lượng sản phẩm phải là một số dương.');
      return;
    }

    // Build JSON payload as requested
    const payload = {
      parentAssetID: `${id}-0`,
      unitCount: unitCount,
      unitIDPrefix: splitDetails.unitIDPrefix,
    };

    console.log('Split payload:', payload);

    // simulate API call to split and create units
    setIsLoading(true);
    await asset.splitToUnits(payload);

    const newUnits: UnitInfo[] = Array.from({ length: Math.min(unitCount, 20) }, (_, i) => ({
      id: `${splitDetails.unitIDPrefix}${String(i + 1).padStart(3, '0')}`,
      assetID: `${splitDetails.unitIDPrefix}${String(i + 1).padStart(3, '0')}`,
      productName: batchData?.productName || 'Sản phẩm',
      status: 'available',
      createdAt: new Date().toISOString(),
    }));

    setBatchData((prev) => (prev ? { ...prev, units: newUnits } : prev));
    setIsLoading(false);
    setSplitModalVisible(false);
    Alert.alert('Thành công', `Đã tách thành công ${newUnits.length} sản phẩm.`, [
      {
        text: 'Xem danh sách',
        onPress: () => {
          // scroll or navigate could be added
        },
      },
      { text: 'Đóng', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Stack.Screen options={{ title: `Lô hàng: ${id}` }} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {isLoading && <ActivityIndicator size="large" color="#4F46E5" />}
        {batchData && <AssetInfoCard batchData={batchData} />}

        <AssetActionButtons
          onUpdateStorage={() => setUpdateStorageModalVisible(true)}
          onSplitUnits={() => setSplitModalVisible(true)}
          splitDisabled={!!(batchData?.units && batchData.units.length > 0)}
        />

        {Array.isArray(batchData?.units) && batchData!.units!.length > 0 && (
          <ProductList units={batchData!.units!} />
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
