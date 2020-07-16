import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BerriesScreen from './Screens/BerriesScreen';
import {Image, StyleSheet} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PokeDex"
      component={HomeScreen}
      options={{headerStyle: {backgroundColor: '#e8faea'}}}
    />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={{headerStyle: {backgroundColor: 'rgb(192, 233, 249)'}}}
    />
  </Stack.Navigator>
);

const BerriesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Yummy Berries"
      component={BerriesScreen}
      options={{headerStyle: {backgroundColor: '#e8faea'}}}
    />
  </Stack.Navigator>
);

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{showLabel: false, style: styles.navContainer}}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let imageUrl;
            if (route.name === 'PokeDex') {
              focused
                ? (imageUrl = require('./images/homeActive.png'))
                : (imageUrl = require('./images/homeInactive.png'));
            } else {
              focused
                ? (imageUrl = require('./images/berriesActive.png'))
                : (imageUrl = require('./images/berriesInactive.png'));
            }
            return <Image source={imageUrl} />;
          },
        })}>
        <Tab.Screen name="PokeDex" component={HomeStack} />
        <Tab.Screen name="Berries" component={BerriesStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: '#e8faea',
    height: 95,
  },
});
