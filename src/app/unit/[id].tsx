import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ExpiryWarning,
  IUnit,
  SaleTransaction,
  SalesSection,
  ShelfUpdateData,
  ShelfUpdateSection,
  UnitHistory,
  UnitInfoCard,
  formatPrice,
  getMockUnitHistory,
} from '../../components/unit';

const UnitDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [unit, setUnit] = useState<IUnit | null>(null);
  const [history, setHistory] = useState<UnitHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUnitDetails = async () => {
      setIsLoading(true);
      console.log(`Fetching details for unit: ${id}`);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create dynamic mock unit data based on unit ID
      const isFromBatch = id?.includes('UNIT-TB-101-') || false;
      const unitNumber = id?.split('-').pop() || '001';

      const mockUnit: IUnit = {
        assetID: id || 'UNIT-001',
        id: id,
        productName: isFromBatch ? 'Thịt bò Wagyu A5' : 'Sản phẩm thịt bò',
        batchCode: isFromBatch ? 'TB-A5-20241220' : `TB-${unitNumber}-${new Date().getFullYear()}`,
        status: 'available',
        originalQuantity: { unit: 'kg', value: 2.5 },
        currentQuantity: { unit: 'kg', value: 2.5 },
        price: isFromBatch ? 1200000 : 800000,
        expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        location: `Kệ A${Math.floor(Math.random() * 5) + 1} - Tủ lạnh`,
        temperature: -2,
        createdAt: isFromBatch ? new Date().toISOString() : '2024-12-20T08:00:00Z',
        updatedAt: new Date().toISOString(),
        description: isFromBatch
          ? 'Thịt bò Wagyu A5 nhập khẩu từ Nhật Bản, được tách từ lô hàng BATCH-001'
          : 'Thịt bò Wagyu A5 nhập khẩu từ Nhật Bản, chất lượng cao',
        weight: 2.5,
        parentAssetIDs: isFromBatch ? ['BATCH-001'] : ['ASSET-WAGYU-001'],
      };
      setUnit(mockUnit);
      setHistory(getMockUnitHistory(mockUnit.assetID));
      setIsLoading(false);
    };

    if (id) {
      fetchUnitDetails();
    }
  }, [id]);

  const handleSell = async (transaction: SaleTransaction) => {
    console.log('Selling unit:', transaction);

    // Update unit quantity after sale
    if (unit && unit.currentQuantity) {
      const newQuantity = unit.currentQuantity.value - transaction.quantity.value;
      const updatedUnit = {
        ...unit,
        currentQuantity: { ...unit.currentQuantity, value: newQuantity },
        status: newQuantity <= 0 ? 'sold' : 'available',
        updatedAt: new Date().toISOString(),
      };

      setUnit(updatedUnit);

      // Add to history
      const newHistoryItem: UnitHistory = {
        id: `hist-${Date.now()}`,
        action: 'sold',
        description: `Bán ${transaction.quantity.value} ${transaction.quantity.unit} - ${formatPrice(transaction.price)}`,
        timestamp: new Date().toISOString(),
        quantity: transaction.quantity,
        performedBy: 'Nhân viên bán hàng',
      };

      setHistory((prev) => [newHistoryItem, ...prev]);
    }
  };

  const handleShelfUpdate = async (data: ShelfUpdateData) => {
    console.log('Updating shelf location:', data);

    if (unit) {
      const updatedUnit = {
        ...unit,
        location: data.location,
        temperature: data.temperature,
        updatedAt: new Date().toISOString(),
      };

      setUnit(updatedUnit);

      // Add to history
      const newHistoryItem: UnitHistory = {
        id: `hist-${Date.now()}`,
        action: 'moved',
        description: `Chuyển đến vị trí ${data.location}${data.temperature ? ` (${data.temperature}°C)` : ''}`,
        timestamp: new Date().toISOString(),
        location: data.location,
        performedBy: 'Nhân viên kho',
      };

      setHistory((prev) => [newHistoryItem, ...prev]);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#4F46E5" />
      </SafeAreaView>
    );
  }

  if (!unit) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
        <Stack.Screen options={{ title: 'Không tìm thấy' }} />
        <Text className="text-center text-gray-500">Không tìm thấy thông tin sản phẩm.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Stack.Screen
        options={{
          title: unit.productName || `Sản phẩm ${unit.assetID}`,
          headerBackTitle: 'Quay lại',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <UnitInfoCard unit={unit} formatPrice={formatPrice} />

        <ExpiryWarning unit={unit} />

        <SalesSection unit={unit} onSell={handleSell} formatPrice={formatPrice} />

        <ShelfUpdateSection unit={unit} onShelfUpdate={handleShelfUpdate} />

        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UnitDetail;
