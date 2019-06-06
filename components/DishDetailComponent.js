
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from "../shared/dishes";

//functional component
function RenderDish(props)
{
  const dish = props.dish;

  if (dish == null)
  {
    return (
      <View></View>
    );
  }

  return (
    <Card
      featuredTitle={dish.name}
      image={require("./images/uthappizza.png")}
    >
      <Text style={{ margin: 10 }}>
        {dish.description}
      </Text>
    </Card>
  );
}

class DishDetail extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      dishes: DISHES
    };
  }

  static navigationOptions =
  {
    title: "Dish Details"
  }

  render()
  {
    //extract the parameter that we passed in as data in the MenuComponent.js
    //navigate object. Second parameter is a fallback/default value.
    const dishId = this.props.navigation.getParam("dishId", "");

    return (
      <RenderDish dish={this.state.dishes.find((dish) => dish.id === +dishId)} />
    );
  }
}

export default DishDetail;
