import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <View className="flex-row items-center mb-2">
    <Ionicons name={icon} size={20} color="#6B7280" />
    <Text className="text-base text-gray-600 ml-3 w-32">{label}</Text>
    <Text className="text-base font-semibold text-gray-800 flex-1 text-right">{value}</Text>
  </View>
);

export default InfoRow;
