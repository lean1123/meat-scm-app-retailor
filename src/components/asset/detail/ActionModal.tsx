import { Modal, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  onSubmit: () => void;
  children: React.ReactNode;
}

const ActionModal = ({ visible, onClose, title, onSubmit, children }: ActionModalProps) => (
  <Modal visible={visible} transparent animationType="fade">
    <View className="flex-1 justify-center items-center bg-black/50">
      <View className="w-[90%] bg-white rounded-2xl p-5 shadow-lg">
        <Text className="text-xl font-bold mb-4">{title}</Text>
        {children}
        <View className="flex-row justify-end mt-5">
          <TouchableOpacity
            onPress={onClose}
            className="min-w-[90px] py-2 px-4 rounded-lg items-center bg-gray-100 ml-2"
            activeOpacity={0.8}
          >
            <Text className="text-gray-700 font-bold text-base">Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSubmit}
            className="min-w-[90px] py-2 px-4 rounded-lg items-center bg-indigo-600 ml-2"
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-base">Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default ActionModal;
