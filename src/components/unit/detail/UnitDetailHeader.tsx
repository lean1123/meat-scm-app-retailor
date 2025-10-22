import { View, Text } from 'react-native';
import React from 'react';
import { IUnit } from '../types';
import { getStatusColor, getStatusText } from '../utils';

interface UnitDetailHeaderProps {
  unit: IUnit;
}

const UnitDetailHeader: React.FC<UnitDetailHeaderProps> = ({ unit }) => {
  return (
    <View className="pt-12 pb-4 bg-white items-center border-b border-gray-200">
      <Text className="text-2xl font-bold text-gray-800">{unit.productName || 'Sản phẩm'}</Text>
      <Text className="text-gray-500 mt-1">{unit.id || unit.assetID}</Text>
      <View className="mt-2">
        <Text className={`font-semibold ${getStatusColor(unit.status || '')}`}>
          {getStatusText(unit.status || '')}
        </Text>
      </View>
    </View>
  );
};

export default UnitDetailHeader;
