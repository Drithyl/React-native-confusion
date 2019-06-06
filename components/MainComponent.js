
import React, { Component } from "react";
import { View, Platform } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

//import data
import { DISHES } from "../shared/dishes.js";

//import components
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";

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

//In React-native 3, an explicit navigator container must be declared.
//In v2 the above MenuNavigator represented a container in and of itself,
//so it could be included with <MenuNavigator />, but not anymore. This
//MenuNavigatorContainer wraps the MenuNavigator and is used like <MenuNavigatorContainer />
const MenuNavigatorContainer = createAppContainer(MenuNavigator);

class Main extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      dishes: DISHES,
      selectedDish: null
    };
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
        <MenuNavigatorContainer />
      </View>
    );
  }
}

export default Main;
