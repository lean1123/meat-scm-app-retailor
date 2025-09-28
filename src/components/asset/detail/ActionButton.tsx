import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const ActionButton = ({ icon, title, onPress, disabled = false }: ActionButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    className={`bg-white p-4 rounded-xl flex-row items-center shadow ${disabled ? 'opacity-50' : ''}`}
    activeOpacity={0.7}
  >
    <Ionicons name={icon} size={24} color={disabled ? '#9CA3AF' : '#4F46E5'} />
    <Text className="text-lg font-bold text-gray-800 ml-4">{title}</Text>
    {!disabled && <Ionicons name="chevron-forward" size={24} color="#9CA3AF" className="ml-auto" />}
  </TouchableOpacity>
);

export default ActionButton;
