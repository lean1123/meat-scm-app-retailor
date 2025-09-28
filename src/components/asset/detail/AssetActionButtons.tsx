import React from 'react';
import { View } from 'react-native';
import ActionButton from './ActionButton';

interface Props {
  onUpdateStorage: () => void;
  onSplitUnits: () => void;
  splitDisabled: boolean;
}

const AssetActionButtons = ({ onUpdateStorage, onSplitUnits, splitDisabled }: Props) => (
  <View className="space-y-4">
    <View style={{ marginBottom: 8 }}>
      <ActionButton icon="location" title="Cập nhật Vị trí Kho" onPress={onUpdateStorage} />
    </View>
    <ActionButton
      icon="grid"
      title="Tách thành Sản phẩm lẻ"
      onPress={onSplitUnits}
      disabled={splitDisabled}
    />
  </View>
);

export default AssetActionButtons;
