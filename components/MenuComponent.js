
import React, { Component } from "react";
import { View, Flatlist } from "react-native";
import { ListItem } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

//functional component
function Menu(props)
{
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
      data={props.dishes}
      renderItem={renderMenuItem}
      keyExtractor={item => item.id.toString()}
    />
  );
}

export default Menu;