import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { Constants } from 'expo';
import Item from './components/Item';
import Details from './components/Details';
import AddItem from './components/AddItem';
import { createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

class Home extends Component {
  state = {
    isDataEmpty: true,
    data: [],
  };

  componentDidMount() {
    this.props.navigation.setParams({ add: this._addItem });
    this._loadData();
  }

  _loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('ItemList');
      console.log(data)
      if (data !== null) {
        this.setState({ data: JSON.parse(data), isDataEmpty: false });
        console.log(this.state.data);
      } else {
        return fetch(
          'https://www.dmi.unict.it/~calanducci/LAP2/favorities.json'
        )
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              data: responseJson.data,
            });
            //console.log(this.state.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _addItem = item => {
    if (this.state.isDataEmpty) {
      console.log("no dati")
      this.setState({ data: [] }, () => {
        this.setState({ data: [...this.state.data, item] }, () => {
          this.setState({ isDataEmpty: false });
          this._addToAsyncStorage();
        });
      });
    } else{
      console.log("ci sono dati")
      this.setState({ data: [...this.state.data, item] }, () =>
        this._addToAsyncStorage()
      );
    }
  };

  _addToAsyncStorage = async () => {
    console.log(JSON.stringify(this.state.data))
    console.log("provo a salvare")
    try {
      await AsyncStorage.setItem('ItemList', JSON.stringify(this.state.data)), () => {
        console.log ("Fatto!")
      };
    } catch (error) {
      // error
    }
  };

  _renderItem = ({ item }) => (
    <Item data={item} navigation={this.props.navigation} />
  );
  _keyExtractor = (item, index) => String(index);

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

Home.navigationOptions = ({ navigation }) => {
  return {
    title: 'Esame LAP 2',
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Add', {
            onAdd: navigation.state.params.add,
          })
        }>
        <Ionicons
          style={{ paddingHorizontal: 20 }}
          name="ios-add-outline"
          size={34}
          color="white"
        />
      </TouchableOpacity>
    ),
  };
};

const MainNav = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Details: {
      screen: Details,
    },
    Add: {
      screen: AddItem,
    },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'steelblue',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
const App = () => {
  return <MainNav />;
};

export default App;
