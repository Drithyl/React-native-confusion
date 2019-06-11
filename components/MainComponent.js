
import React, { Component } from "react";
import { View, Platform } from "react-native";
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";

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
  navigationOptions: {
    backgroundColor: "#512DA8"
  },

  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff"
  }
});


const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
},
{
  navigationOptions: {
    backgroundColor: "#512DA8"
  },

  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff"
  }
});

const AboutNavigator = createStackNavigator({
  About: { screen: About }
},
{
  navigationOptions: {
    backgroundColor: "#512DA8"
  },

  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff"
  }
});

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact }
},
{
  navigationOptions: {
    backgroundColor: "#512DA8"
  },

  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff"
  }
});

const MainNavigator = createDrawerNavigator({
  Home:
  {
    screen: HomeNavigator,
    navigationOptions:
    {
      title: "Home",
      drawerLabel: "Home"
    }
  },

  About:
  {
    screen: AboutNavigator,
    navigationOptions:
    {
      title: "About Us",
      drawerLabel: "About Us"
    }
  },

  Menu:
  {
    screen: MenuNavigator,
    navigationOptions:
    {
      title: "Menu",
      drawerLabel: "Menu"
    }
  },

  Contact:
  {
    screen: ContactNavigator,
    navigationOptions:
    {
      title: "Contact Us",
      drawerLabel: "Contact Us"
    }
  }
},
{
  drawerBackgroundColor: "#D1C4E9"
});

//In react-navigation v3, an explicit navigator container must be declared.
//In v2 the above MainNavigator represented a container in and of itself,
//so it could be included with <MainNavigator />, but not anymore. This
//MainNavigatorContainer wraps the MainNavigator and is used like <MainNavigatorContainer />
//It also acts as a container for the child elements, Menu and HomeContainers.
//See https://stackoverflow.com/questions/53367195/invariant-violation-the-navigation-prop-is-missing-for-this-navigator
const MainNavigatorContainer = createAppContainer(MainNavigator);

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
        <MainNavigatorContainer />
      </View>
    );
  }
}

export default Main;
