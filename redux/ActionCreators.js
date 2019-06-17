
import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

//thunk
export const fetchComments = () =>
{
  return function(dispatch)
  {
    return fetch(`${baseUrl}comments`)
    .then((response) =>
    {
      if (response.ok)
      {
        return response;
      }

      else
      {
        let error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
    (error) =>
    {
      let errMess = new Error(error.message);
      throw errMess;
    })
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
  }
};

export const commentsFailed = (errMess) =>
{
  return {
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
  }
};

export const addComments = (comments) =>
{
  return {
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
  };
};

export const postComment = (dishId, rating, author, comment) =>
{
  return function(dispatch)
  {
    let commentToAdd =
    {
      dishId,
      rating,
      author,
      comment,
      date: new Date().toISOString()
    };

    setTimeout(() =>
    {
      dispatch(addComment(commentToAdd));
    }, 2000)
  }
};

export const addComment = (comment) =>
{
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: comment
  }
};

//thunk
export const fetchDishes = () =>
{
  return function(dispatch)
  {
    dispatch(dishesLoading());

    return fetch(`${baseUrl}dishes`)
    .then((response) =>
    {
      if (response.ok)
      {
        return response;
      }

      else
      {
        let error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
    (error) =>
    {
      let errMess = new Error(error.message);
      throw errMess;
    })
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
  }
};

export const dishesLoading = () =>
{
  return {
    type: ActionTypes.DISHES_LOADING
  };
};

export const dishesFailed = (errMess) =>
{
  return {
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
  }
};

export const addDishes = (dishes) =>
{
  return {
    type: ActionTypes.ADD_DISHES,
    payload: dishes
  };
};

//thunk
export const fetchPromos = () =>
{
  return function(dispatch)
  {
    dispatch(promosLoading());

    return fetch(`${baseUrl}promotions`)
    .then((response) =>
    {
      if (response.ok)
      {
        return response;
      }

      else
      {
        let error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
    (error) =>
    {
      let errMess = new Error(error.message);
      throw errMess;
    })
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
  }
};

export const promosLoading = () =>
{
  return {
    type: ActionTypes.PROMOS_LOADING
  };
};

export const promosFailed = (errMess) =>
{
  return {
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
  }
};

export const addPromos = (promos) =>
{
  return {
    type: ActionTypes.ADD_PROMOS,
    payload: promos
  };
};

//thunk
export const fetchLeaders = () =>
{
  return function(dispatch)
  {
    dispatch(leadersLoading());

    return fetch(`${baseUrl}leaders`)
    .then((response) =>
    {
      if (response.ok)
      {
        return response;
      }

      else
      {
        let error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
    (error) =>
    {
      let errMess = new Error(error.message);
      throw errMess;
    })
    .then((response) => response.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
  }
};

export const leadersLoading = () =>
{
  return {
    type: ActionTypes.LEADERS_LOADING
  };
};

export const leadersFailed = (errMess) =>
{
  return {
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
  }
};

export const addLeaders = (leaders) =>
{
  return {
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
  };
};

//thunk
export const postFavorite = (dishId) =>
{
  return function(dispatch)
  {
    setTimeout(() =>
    {
      dispatch(addFavorite(dishId));
    }, 2000)
  }
};

export const addFavorite = (dishId) =>
{
  return {
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
  }
};
