import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Permissions, ImagePicker } from 'expo';

export default class AddItem extends Component {
  state = {
    name: '',
    address: '',
    img: null,
    info: '',
    tel: '',
    url: '',
  };

  _save = async () => {
    const newItem = {
      name: this.state.name ? this.state.name : '',
      img: this.state.img ? this.state.img : null,
      address: this.state.address ? this.state.address : '',
      info: this.state.info ? this.state.info : '',
      tel: this.state.tel ? this.state.tel : '',
      url: this.state.url ? this.state.url : '',
    };
    console.log(newItem);
    if (newItem.name !== '' && newItem.img !== null && newItem.address !== '') {
      this.props.navigation.state.params.onAdd(newItem);
      this.props.navigation.goBack();
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ save: this._save });
  }

  _openPhotoGallery = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (result.status !== 'granted') {
        alert('you need to authorize the app');
        return;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ img: result.uri });
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              marginTop: 30,
              //alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => this._openPhotoGallery()}>
              <Image
                resizeMode="cover"
                style={{ aspectRatio: 1.33 }}
                source={
                  this.state.img
                    ? { uri: this.state.img }
                    : require('../assets/placeholder.png')
                }
              />
            </TouchableOpacity>
          </View>

          <View style={styles.riquadro}>
            <TextInput
              style={{
                borderWidth: 0,
                textAlignVertical: 'top',
              }}
              placeholder="Name"
              value={this.state.name}
              underlineColorAndroid="steelblue"
              selectionColor="steelblue"
              caretColor="steelblue"
              onChangeText={value => this.setState({ name: value })}
            />
          </View>
          <View style={styles.riquadro}>
            <TextInput
              style={{
                borderWidth: 0,
                textAlignVertical: 'top',
              }}
              placeholder="Address"
              value={this.state.address}
              underlineColorAndroid="steelblue"
              selectionColor="steelblue"
              caretColor="steelblue"
              onChangeText={value => this.setState({ address: value })}
            />
          </View>
          <View style={styles.riquadro}>
            <TextInput
              style={{
                borderWidth: 0,
                textAlignVertical: 'top',
              }}
              placeholder="Description (optional)"
              value={this.state.info}
              underlineColorAndroid="steelblue"
              selectionColor="steelblue"
              caretColor="steelblue"
              onChangeText={value => this.setState({ info: value })}
            />
          </View>
          <View style={styles.riquadro}>
            <TextInput
              style={{
                borderWidth: 0,
                textAlignVertical: 'top',
              }}
              placeholder="Telephone (optional)"
              value={this.state.tel}
              underlineColorAndroid="steelblue"
              selectionColor="steelblue"
              caretColor="steelblue"
              onChangeText={value => this.setState({ tel: value })}
            />
          </View>
          <View style={styles.riquadro}>
            <TextInput
              style={{
                borderWidth: 0,
                textAlignVertical: 'top',
              }}
              placeholder="Website/email (optional)"
              value={this.state.url}
              underlineColorAndroid="steelblue"
              selectionColor="steelblue"
              caretColor="steelblue"
              onChangeText={value => this.setState({ url: value })}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

AddItem.navigationOptions = ({ navigation }) => ({
  title: 'Add',
  headerRight: (
    <TouchableOpacity onPress={() => navigation.state.params.save()}>
      <Ionicons
        style={{ paddingHorizontal: 20 }}
        name="ios-checkmark"
        size={34}
        color="white"
      />
    </TouchableOpacity>
  ),
  headerLeft: (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons
        style={{ paddingHorizontal: 20 }}
        name="ios-close"
        size={34}
        color="white"
      />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  riquadro: {
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    // borderWidth: 1,
  },
});
