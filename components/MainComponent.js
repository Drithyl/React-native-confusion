
import React, { Component } from "react";
import { View, Platform, Image, StyleSheet, ScrollView, Text } from "react-native";
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from "react-navigation";
import { Icon } from 'react-native-elements';

//import components
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";

//specify screens to navigate through in the first parameter, in the form
//of a JS Object. This is essentially a new component.
const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  DishDetail: { screen: DishDetail }
},
//navigation options in the second parameter
{
  initialRouteName: "Menu",
  //can make navigationOptions into a function which gets the
  //navigation props as parameters. Return a JS Object with the
  //headerLeft property given an Icon
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      color: "#fff"
    },
    headerLeft:
    <Icon
      name="menu"
      size={24}
      color="white"
      onPress={() => navigation.toggleDrawer()}
    />
  })
});


const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
},
{
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      color: "#fff"
    },
    headerLeft:
    <Icon
      name="menu"
      size={24}
      color="white"
      onPress={() => navigation.toggleDrawer()}
    />
  })
});

const AboutNavigator = createStackNavigator({
  About: { screen: About }
},
{
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      color: "#fff"
    },
    headerLeft:
    <Icon
      name="menu"
      size={24}
      color="white"
      onPress={() => navigation.toggleDrawer()}
    />
  })
});

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact }
},
{
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      color: "#fff"
    },
    headerLeft:
    <Icon
      name="menu"
      size={24}
      color="white"
      onPress={() => navigation.toggleDrawer()}
    />
  })
});

const CustomDrawerContentComponent = (props) => (

  <ScrollView>
    {/* specifically for the iPhone X */}
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{flex: 1}}>
          <Image
            source={require("./images/logo.png")}
            style={styles.drawerImage}
          />
        </View>

        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>

      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator({
  Home:
  {
    screen: HomeNavigator,
    navigationOptions: {
      title: "Home",
      drawerLabel: "Home",
      drawerIcon: ({ tintColor }) =>
      (
        <Icon name="home"
              type="font-awesome"
              size={24}
              color={tintColor}
        />
      )
    }
  },

  About:
  {
    screen: AboutNavigator,
    navigationOptions:
    {
      title: "About Us",
      drawerLabel: "About Us",
      drawerIcon: ({ tintColor }) =>
      (
        <Icon name="info-circle"
              type="font-awesome"
              size={24}
              color={tintColor}
        />
      )
    }
  },

  Menu:
  {
    screen: MenuNavigator,
    navigationOptions:
    {
      title: "Menu",
      drawerLabel: "Menu",
      drawerIcon: ({ tintColor }) =>
      (
        <Icon name="list"
              type="font-awesome"
              size={24}
              color={tintColor}
        />
      )
    }
  },

  Contact:
  {
    screen: ContactNavigator,
    navigationOptions:
    {
      title: "Contact Us",
      drawerLabel: "Contact Us",
      drawerIcon: ({ tintColor }) =>
      (
        <Icon name="address-card"
              type="font-awesome"
              size={22}
              color={tintColor}
        />
      )
    }
  }
},
{
  drawerBackgroundColor: "#D1C4E9",
  //defines the layout of the drawer to be what's specified in CustomDrawerContentComponent
  contentComponent: CustomDrawerContentComponent
});

class Main extends Component
{
  constructor(props)
  {
    super(props);
  }

  onDishSelect(dishId)
  {
    this.setState({ selectedDish: dishId });
  }

  render()
  {
    return (
      //onPress is the event for when a user presses on an element
      //If platform is Android, we will give enough space at the top for the statusBar
      <View style={{ flex: 1, paddingTop: Platform.OS ==="ios" ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1
  },

  drawerHeader:
  {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row"
  },

  drawerHeaderText:
  {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  drawerImage:
  {
    margin: 10,
    width: 80,
    height: 60
  }
})

export default Main;
