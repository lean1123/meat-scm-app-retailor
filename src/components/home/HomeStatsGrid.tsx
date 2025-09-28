import React from 'react';
import { View } from 'react-native';
import StatCard from './StatCard';

interface InventoryStats {
  totalBatches: number;
  delivering: number;
  sent: number;
  received: number;
}

const HomeStatsGrid = ({ stats }: { stats: InventoryStats }) => (
  <>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <StatCard
        icon="cube-outline"
        color="#4F46E5"
        value={stats.totalBatches}
        label="Lô hàng trong kho"
      />
      <StatCard
        icon="car-outline"
        color="#f59e42"
        value={stats.delivering}
        label="Lô hàng đang vận chuyển"
      />
    </View>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <StatCard icon="send-outline" color="#10B981" value={stats.sent} label="Lô hàng đã gửi đi" />
      <StatCard
        icon="download-outline"
        color="#6366f1"
        value={stats.received}
        label="Lô hàng mới nhận"
      />
    </View>
  </>
);

export default HomeStatsGrid;
