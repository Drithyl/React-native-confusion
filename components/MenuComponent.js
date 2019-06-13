
import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) =>
{
  return {
    dishes: state.dishes
  }
};

class  Menu extends Component
{

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
        <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured
          onPress={() => navigate("DishDetail", { dishId: item.id })}
          imageSrc={{ source: { uri: `${baseUrl}${item.image}` } }}
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
        data={this.props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Menu);
