import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MapView, Marker, Location, Permissions } from 'expo';

export default class Details extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this._getPosition();
  }

  _getPosition = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else
      this.setState({
        position: Location.reverseGeocodeAsync(
          this.props.navigation.state.params.data.address
        ),
      });
    console.log(this.state.position)
  };

  render() {
    return (
      <ScrollView>
        <Image
          resizeMode="cover"
          style={{ width: '100%', aspectRatio: 1.33 }}
          source={{ uri: this.props.navigation.state.params.data.img }}
        />
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
            }}>
            {this.props.navigation.state.params.data.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {this.props.navigation.state.params.data.info}
          </Text>
          <Text>{this.props.navigation.state.params.data.address}</Text>
          <Text>{this.props.navigation.state.params.data.tel}</Text>
          <Text>{this.props.navigation.state.params.data.url}</Text>
          <MapView
            style={{ width: '100%', height: 200 }}
            initialRegion={this.state.position}
          />
        </View>
      </ScrollView>
    );
  }
}

Details.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.state.params.data.name,
  };
};
