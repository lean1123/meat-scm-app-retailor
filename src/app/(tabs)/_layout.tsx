import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const TabBarIcon = ({
  name,
  color,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
}) => {
  return (
    <View
      className={`items-center justify-center p-2 rounded-full ${focused ? 'bg-indigo-100' : 'bg-transparent'}`}
    >
      <Ionicons name={name} size={20} color={color} />
    </View>
  );
};

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#053573',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#dfe1f9',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Kho hàng',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'archive' : 'archive-outline'}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="qrCode"
        options={{
          tabBarButton: (props) => (
            <View style={styles.qrContainer}>
              <TouchableOpacity style={styles.qrButton} onPress={() => router.push('/qrCode')}>
                <TabBarIcon
                  name={props?.accessibilityState?.selected ? 'scan' : 'scan-outline'}
                  color={props.accessibilityState?.selected ? '#053573' : '#6B7280'}
                  focused={!!props?.accessibilityState?.selected}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="sell"
        options={{
          title: 'Bán hàng',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'relative',
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#f97316',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  qrContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#8abdda',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
});
