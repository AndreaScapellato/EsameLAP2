import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

export default class Item extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Details', { data: this.props.data })
        }>
        <View style={{ borderBottomWidth: 10, borderColor: 'lightgrey' }}>
          <Image
            resizeMode="cover"
            style={{ width: '100%', aspectRatio: 1.33 }}
            source={{ uri: this.props.data.img }}
          />
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              {this.props.data.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              {this.props.data.info}
            </Text>
            <Text>{this.props.data.address}</Text>
            <Text>{this.props.data.tel}</Text>
            <Text>{this.props.data.url}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
