
import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet, Button, Modal, Alert, PanResponder } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) =>
{
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    postFavorite: (dishId) =>
    {
      dispatch(postFavorite(dishId));
    },

    postComment: (dishId, rating, author, comment) =>
    {
      dispatch(postComment(dishId, rating, author, comment));
    }
  }
};

//functional component
function RenderDish(props)
{
  const dish = props.dish;

  handleViewRef = ref => this.view = ref;

  //dx and dy are the distance traveled by the gesture of the user on screen
  const recognizeDrag = ({ moveX, moveY, dx, dy }) =>
  {
    if (dx < -200)
    {
      return true;
    }

    else return false;
  };

  const recognizeComment = ({ moveX, moveY, dx, dy }) =>
  {
    if (dx > 200)
    {
      return true;
    }

    else return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (event, gestureState) =>
    {
      return true;
    },

    onPanResponderGrant: () =>
    {
      this.view.rubberBand(1000)
      .then((endState) =>
      {
        console.log(endState.finished ? "finished" : "cancelled");
      });
    },

    onPanResponderEnd: (event, gestureState) =>
    {
      if (recognizeDrag(gestureState))
      {
        Alert.alert(
          "Add to Favorites?",
          `Are you sure you wish to add ${dish.name} to your favorites?`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel pressed"),
              style: "cancel"
            },

            {
              text: "Ok",
              onPress: () => props.favorite ? console.log("Already favorite") : props.onPress()
            }
          ],
          { cancelable: false }
        )
      }

      else if (recognizeComment(gestureState))
      {
        props.toggleModal();
      }

      return true;
    }
  });

  if (dish == null)
  {
    return (
      <View></View>
    );
  }

  return (
    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
      ref={this.handleViewRef}
      {...panResponder.panHandlers}
    >
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

        <Icon
          raised
          name="pencil"
          type="font-awesome"
          color="#512DA8"
          onPress={() => { props.toggleModal() }}
        />
      </Card>
    </Animatable.View>
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
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

class DishDetail extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      rating: 1,
      author: "",
      comment: "",
      showModal: false
    };
  }

  static navigationOptions =
  {
    title: "Dish Details"
  };

  toggleModal()
  {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm()
  {
    this.setState({
      rating: 1,
      author: "",
      comment: ""
    });
  }

  handleComment(dishId)
  {
    this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
    this.toggleModal();
    this.resetForm();
  }

  markFavorite(dishId)
  {
    this.props.postFavorite(dishId);
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
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          toggleModal={() => this.toggleModal()}
        />

        <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => { this.toggleModal(); this.resetForm() }}
          onRequestClose={() => { this.toggleModal(); this.resetForm() }}
        >
          <ScrollView>
            <View style={styles.formRow}>
              <Rating
                showRating
                startingValue={this.state.rating}
                minValue={1}
                fractions={0}
                onFinishRating={(rating) => this.setState({ rating: rating })}
              />
            </View>

            <View style={styles.formRow}>
              <Input
                style={styles.formItem}
                placeholder=" Author"
                leftIcon={{ type: "font-awesome", name: "user", size: 24 }}
                onChangeText={(text) => this.setState({ author: text })}
              />
            </View>

            <View style={styles.formRow}>
              <Input
                style={styles.formItem}
                placeholder=" Comment"
                leftIcon={{ type: "font-awesome", name: "comment", size: 24 }}
                onChangeText={(text) => this.setState({ comment: text })}
              />
            </View>

            <View style={styles.formRow}>
              <Button
                style={styles.formItem}
                title="Submit"
                color="#512DA8"
                onPress={() => this.handleComment(dishId)}
                accessibilityLabel="Learn more about this purple button"
              />
            </View>

            <View style={styles.formRow}>
              <Button
                style={styles.formItem}
                title="Cancel"
                color="#C2C5CC"
                onPress={() => { this.toggleModal(); this.resetForm() }}
                accessibilityLabel="Learn more about this grey button"
              />
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow:
  {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },

  formItem:
  {
    flex: 1
  },

  modal:
  {
    justifyContent: "center",
    margin: 20
  },

  modalTitle:
  {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20
  },

  modalText:
  {
    fontSize: 18,
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
