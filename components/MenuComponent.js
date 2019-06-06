
import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { DISHES } from "../shared/dishes";

class  Menu extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      dishes: DISHES
    };
  }

  //will ensure that in the statusBar inside MainComponent.js, when the Menu
  //component is displayed, the title that will be shown will be Menu
  static navigationOptions =
  {
    title: "Menu"
  }

  render()
  {
    //extract the .navigate value from props.navigation to use below
    //in the onPress function. Just specifying the name of the component
    //defined in the MainComponent.js MenuNavigator will make it take us there
    //also passes it the data included in the second parameter, which will
    //be available inside this.props.navigation.getParam() inside that component
    const { navigate } = this.props.navigation;

    //function to pass to the renderItem attribute of the FlatList element
    const renderMenuItem = ({ item, index }) =>
    {
      return (
        //Takes a key, as for any React element in a list.
        //By default it puts a chevron in each element in the list
        //(the iOS way of rendering a list), but we don't need it in
        //android, so we can use the hideChevron attribute.
        //The leftAvatar attribute allows us to specify an image. We
        //can use node's require for a static source inside our project.
        //https://react-native-training.github.io/react-native-elements/docs/listitem.html
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          onPress={() => navigate("DishDetail", { dishId: item.id })}
          leftAvatar={{ source: require("./images/uthappizza.png") }}
        />
      );
    };

    return (
      //FlatList will render an array of objects into a list of items,
      //mapped into a ListView in Android and the corresponding element
      //in iOS. The renderItem attribute will render the information
      //using the function provided to it. It will use the parameters
      //analogue to the ones in a forEach loop. The keyExtractor attribute
      //will extract one of the props of each item and use it as a
      //React key for its VirtualDOM rendering (expects a String).
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

export default Menu;
