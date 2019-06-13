
import React, { Component } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) =>
{
  return {
    dishes: state.dishes,
    comments: state.comments
  }
};

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
      image={{ uri: `${baseUrl}${dish.image}` }}
    >
      <Text style={{ margin: 10 }}>
        {dish.description}
      </Text>

      {/* raised attribute displays icon like a button */}
      <Icon
        raised
        reversed
        name={ props.favorite ? "heart" : "heart-o" }
        type="font-awesome"
        color="#f50"
        onPress={() => props.favorite ? console.log("Already favorite") : props.onPress()}
      />
    </Card>
  );
}

function RenderComments(props)
{
  const comments = props.comments;

  const renderCommentItem = ({item, index}) =>
  {
    return (
      <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 14}}>{item.comment}</Text>
        <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
        <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
      favorites: []
    };
  }

  static navigationOptions =
  {
    title: "Dish Details"
  }

  markFavorite(dishId)
  {
    this.setState({
      favorites: this.state.favorites.concat(dishId)
    });
  }

  render()
  {
    //extract the parameter that we passed in as data in the MenuComponent.js
    //navigate object. Second parameter is a fallback/default value.
    const dishId = this.props.navigation.getParam("dishId", "");

    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes.find((dish) => dish.id === +dishId)}
          favorite={this.state.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />

      <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(DishDetail);
