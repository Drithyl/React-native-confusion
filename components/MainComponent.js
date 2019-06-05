
import React, { Component } from "react";

//import data
import { DISHES } from "../shared/dishes.js";

//import components
import Menu from "./MenuComponent";

class Main extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      dishes: DISHES
    };
  }

  render()
  {
    return (
      <Menu dishes={this.state.dishes} />
    );
  }
}

export default Main;