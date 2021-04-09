import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Linking,
  Platform,
  PermissionsAndroid,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default class Locations extends Component {
  state = {
    loadCoordinates: false,
    latitude: null,
    longitude: null,
    watchId: null,
  };

  hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        'Turn on Location Services to allow us to determine your location.',
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      Alert.alert('Location permission ', 'Permission Denied by user');
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Location permission ',
        'It is revoked by user Never ask again selected',
      );
    }

    return false;
  };

  getCurrenLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }
    this.setState({loadCoordinates: false}, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loadCoordinates: true,
          });
          console.log(position);
        },
        (error) => {
          this.setState({loadCoordinates: false});
          Alert.alert(`Code ${error.code}`, error.message);
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: true,
          showLocationDialog: true,
        },
      );
    });
  };

  getLocationUpdates = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({loadCoordinates: false}, () => {
      let watchId = Geolocation.watchPosition(
        (position) => {
          console.log(position);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loadCoordinates: true,
          });
        },
        (error) => {
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 5000,
          fastestInterval: 2000,
          forceRequestLocation: true,
          showLocationDialog: true,
          useSignificantChanges: true,
        },
      );
      this.setState({watchId: watchId});
    });
  };

  componentWillUnmount() {
    Geolocation.clearWatch(this.state.watchId);
  }

  render() {
    const {latitude, longitude, loadCoordinates} = this.state;
    // console.log(latitude, longitude, loadCoordinates);
    return (
      <View style={styles.container}>
        {loadCoordinates ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{latitude, longitude}}
              title="This is the current location">
              <Image
                source={require('../assets/locationIcon2.png')}
                style={styles.marker}
              />
            </Marker>
          </MapView>
        ) : null}
        <View style={styles.textContainer}>
          <Text style={styles.textHead}>Current Location</Text>
          <Text style={styles.text}>{`${latitude},${longitude}`}</Text>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.getLocationBtn}
            onPress={() => this.getCurrenLocation()}>
            <Text>Get Current Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.getLocationBtn}
            onPress={() => this.getLocationUpdates()}>
            <Text>Get Location Updates</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 3,
  },
  btns: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getLocationBtn: {
    backgroundColor: 'skyblue',
    padding: 20,
    marginTop: 20,
  },
  marker: {
    width: 100,
    height: 100,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
