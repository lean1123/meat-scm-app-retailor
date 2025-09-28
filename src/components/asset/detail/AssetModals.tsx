import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import ActionModal from './ActionModal';

interface StorageDetails {
  ownerOrgName: string;
  facilityName: string;
  note: string;
}

interface SplitDetails {
  unitCount: string;
  unitIDPrefix: string;
}

interface AssetModalsProps {
  isUpdateStorageModalVisible: boolean;
  setUpdateStorageModalVisible: (v: boolean) => void;
  storageDetails: StorageDetails;
  setStorageDetails: (v: StorageDetails) => void;
  handleUpdateStorage: () => void;

  isSplitModalVisible: boolean;
  setSplitModalVisible: (v: boolean) => void;
  splitDetails: SplitDetails;
  setSplitDetails: (v: SplitDetails) => void;
  handleSplitToUnits: () => void;
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
});

const AssetModals = ({
  isUpdateStorageModalVisible,
  setUpdateStorageModalVisible,
  storageDetails,
  setStorageDetails,
  handleUpdateStorage,
  isSplitModalVisible,
  setSplitModalVisible,
  splitDetails,
  setSplitDetails,
  handleSplitToUnits,
}: AssetModalsProps) => (
  <>
    <ActionModal
      visible={isUpdateStorageModalVisible}
      onClose={() => setUpdateStorageModalVisible(false)}
      title="Cập nhật Vị trí Kho"
      onSubmit={handleUpdateStorage}
    >
      <TextInput
        placeholder="Ghi chú (ví dụ: Kho lạnh - Tủ đông số 2)"
        value={storageDetails.note}
        onChangeText={(text) => setStorageDetails({ ...storageDetails, note: text })}
        style={styles.input}
      />
    </ActionModal>

    <ActionModal
      visible={isSplitModalVisible}
      onClose={() => setSplitModalVisible(false)}
      title="Tách thành Sản phẩm lẻ"
      onSubmit={handleSplitToUnits}
    >
      <TextInput
        placeholder="Số lượng sản phẩm"
        value={splitDetails.unitCount}
        onChangeText={(text) => setSplitDetails({ ...splitDetails, unitCount: text })}
        keyboardType="number-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Tiền tố ID sản phẩm"
        value={splitDetails.unitIDPrefix}
        onChangeText={(text) => setSplitDetails({ ...splitDetails, unitIDPrefix: text })}
        style={styles.input}
      />
    </ActionModal>
  </>
);

export default AssetModals;
