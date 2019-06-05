
import React, { Component } from "react";
import { View } from "react-native";

//import data
import { DISHES } from "../shared/dishes.js";

//import components
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";

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
      <View style={{ flex: 1 }}>
        <Menu
          dishes={this.state.dishes}
          onPress={(dishId) => this.onDishSelect(dishId)}
        />
        <DishDetail dish={this.state.dishes.find((dish) => dish.id === this.state.selectedDish)} />
      </View>
    );
  }
}

export default Main;