import {
  ActionButtons,
  BatchInfoCard,
  ExpiryWarning,
  getStatusColor,
  getStatusText,
  isExpiringSoon,
  MOCK_BATCH,
  RetailBatch,
  SellSection,
} from '@/src/components/sell';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

const SellDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [batch] = useState<RetailBatch>(MOCK_BATCH);
  const [sellQuantity, setSellQuantity] = useState(1);

  // In real app, you would fetch batch by id
  // const [batch, setBatch] = useState<RetailBatch | null>(null);
  // useEffect(() => {
  //   fetchBatchById(id);
  // }, [id]);

  console.log('Viewing batch with ID:', id); // For development

  const handleSell = () => {
    Alert.alert(
      'Xác nhận bán hàng',
      `Bán ${sellQuantity} ${batch.unit} ${batch.productName}?\nTổng tiền: ${(sellQuantity * batch.price).toLocaleString('vi-VN')} VNĐ`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xác nhận',
          onPress: () => {
            Alert.alert('Thành công', 'Đã bán hàng thành công!');
            router.back();
          },
        },
      ],
    );
  };

  const isExpiringSoonWrapper = () => {
    return isExpiringSoon(batch.expiryDate);
  };

  const handleViewOriginalBatch = () => {
    router.push(`/asset/${batch.originalBatchId}`);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <BatchInfoCard
        batch={batch}
        isExpiringSoon={isExpiringSoonWrapper}
        getStatusColor={getStatusColor}
        getStatusText={getStatusText}
      />

      <ExpiryWarning batch={batch} isExpiringSoon={isExpiringSoonWrapper} />

      <SellSection
        batch={batch}
        sellQuantity={sellQuantity}
        setSellQuantity={setSellQuantity}
        handleSell={handleSell}
      />

      <ActionButtons
        batch={batch}
        onViewOriginalBatch={handleViewOriginalBatch}
        onGoBack={handleGoBack}
      />
    </ScrollView>
  );
};

export default SellDetailScreen;
