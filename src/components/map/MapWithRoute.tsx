import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, Polyline, LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import polyline from '@mapbox/polyline';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAZxPZ4DLHK248cZ-w1umJZTnndrjjvxJc';

const origin: LatLng = { latitude: 10.7769, longitude: 106.7009 }; // Ví dụ: Nhà hát Lớn Sài Gòn
const destination: LatLng = { latitude: 10.7793, longitude: 106.6954 }; // Ví dụ: Dinh Độc Lập

const MapWithRoute = () => {
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const getDirections = async () => {
      setIsLoading(true);
      const originStr = `${origin.latitude},${origin.longitude}`;
      const destinationStr = `${destination.latitude},${destination.longitude}`;
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&key=${GOOGLE_MAPS_API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes.length > 0) {
          const points = data.routes[0].overview_polyline.points;
          const decodedCoords = polyline.decode(points).map((point) => ({
            latitude: point[0],
            longitude: point[1],
          }));
          setCoordinates(decodedCoords);
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getDirections();
  }, []);

  useEffect(() => {
    if (coordinates.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [coordinates]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          ...origin,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={origin} title="Điểm đi" pinColor="green" />

        <Marker coordinate={destination} title="Điểm đến" pinColor="red" />

        {coordinates.length > 0 && (
          <Polyline coordinates={coordinates} strokeColor="#007BFF" strokeWidth={5} />
        )}
      </MapView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Đang tìm đường...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapWithRoute;
