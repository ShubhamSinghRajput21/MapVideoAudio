import React from 'react';
import {View, Text, Button, StyleSheet, Linking} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const Location = () => {
  const [coord, setCord] = React.useState({lat: null, lng: null});
  const checkPermission = async () => {
    try {
      let permission = await Geolocation.requestAuthorization('whenInUse');
      if (permission === 'denied') {
        Linking.openSettings();
      }
      return permission;
    } catch (error) {
      console.log('Permission error: ', error);
    }
  };

  const getLocation = async () => {
    console.log('State: ', coord);
    const permission = await checkPermission();
    if (permission === 'granted') {
      Geolocation.getCurrentPosition(
        (location) => {
          console.log('User Location : ', location);
          setCord({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          });
        },
        (error) => {},
        {timeout: 3000, enableHighAccuracy: true},
      );
    }
  };
  return (
    <>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
      <View style={styles.container2}>
        <Text>Geolocation Services Example</Text>
        <Button title={'Get Users Current Location'} onPress={getLocation} />
        <Text>
          User Location : Latitute : {coord.lat} Longitude : {coord.lng}{' '}
        </Text>
      </View>
    </>
  );
};

export default Location;

const styles = StyleSheet.create({
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
