import { View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  SellHeader,
  SearchBar,
  FilterToggle,
  FilterSection,
  ResultsCount,
  BatchItem,
  EmptyState,
  MOCK_RETAIL_BATCHES,
  DATE_FILTERS,
  EXPIRY_FILTERS,
  STATUS_FILTERS,
  getFilteredBatches,
  getStatusColor,
  getStatusText,
  isExpiringSoon,
  RetailBatch,
} from '@/src/components/sell';

const SellScreen = () => {
  const router = useRouter();
  const [batches] = useState<RetailBatch[]>(MOCK_RETAIL_BATCHES);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [expiryFilter, setExpiryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredBatches = getFilteredBatches(
    batches,
    search,
    dateFilter,
    expiryFilter,
    statusFilter,
  );

  const handleBatchPress = (id: string) => {
    router.push(`/sell/${id}`);
  };

  const renderBatchItem = ({ item }: { item: RetailBatch }) => (
    <BatchItem
      item={item}
      onPress={handleBatchPress}
      isExpiringSoon={isExpiringSoon}
      getStatusColor={getStatusColor}
      getStatusText={getStatusText}
    />
  );

  return (
    <View className="flex-1 bg-background">
      <SellHeader title="Quản lý bán lẻ" subtitle="Lô hàng đã tách bán lẻ" />

      <SearchBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Tìm kiếm theo tên sản phẩm, mã lô..."
      />

      <FilterToggle showFilters={showFilters} onToggle={() => setShowFilters(!showFilters)} />

      <FilterSection
        showFilters={showFilters}
        dateFilter={dateFilter}
        expiryFilter={expiryFilter}
        statusFilter={statusFilter}
        onDateFilterChange={setDateFilter}
        onExpiryFilterChange={setExpiryFilter}
        onStatusFilterChange={setStatusFilter}
        dateFilters={DATE_FILTERS}
        expiryFilters={EXPIRY_FILTERS}
        statusFilters={STATUS_FILTERS}
      />

      <ResultsCount count={filteredBatches.length} />

      <FlatList
        data={filteredBatches}
        keyExtractor={(item) => item.id}
        renderItem={renderBatchItem}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
};

export default SellScreen;
