import { useAuth } from '@/src/context/AuthContext';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../../../global.css';
import HomeStatsGrid from '../../components/home/HomeStatsGrid';

interface InventoryStats {
  totalBatches: number;
  delivering: number;
  sent: number;
  received: number;
}

const FAKE_STATS: InventoryStats = {
  totalBatches: 12,
  delivering: 3,
  sent: 5,
  received: 4,
};

export default function HomeScreen() {
  const { userToken } = useAuth();
  const [stats, setStats] = useState<InventoryStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStats(FAKE_STATS);
      setIsLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <View className="w-full h-36 bg-[#dfe1f9] top-0 rounded-b-2xl shadow-md mb-4">
        <View className="flex-row items-center absolute top-10 left-5 bg-white p-2 rounded-full shadow-md">
          <Image src="https://picsum.photos/200" className="w-10 h-10 rounded-full mr-2" />
          <Text className="font-semibold">Xin chào! Thanh An</Text>
        </View>
      </View>

      <View className="flex-1 w-full px-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">Tổng quan kho hàng</Text>
        {isLoading || !stats ? (
          <ActivityIndicator size="large" color="#4F46E5" />
        ) : (
          <HomeStatsGrid stats={stats} />
        )}
      </View>
    </SafeAreaView>
  );
}
