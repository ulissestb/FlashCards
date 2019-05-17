import React, { Component } from "react";
import { View, Platform, StatusBar, StyleSheet } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import {
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { flipY, zoomIn, zoomOut } from "react-navigation-transitions";
import Decks from "./components/Decks";
import Deck from "./components/Deck";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import QuizCard from "./components/QuizCard";
import { setLocalNotification } from "./utils/helpers";

const Tabs = createMaterialTopTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: "Decks"
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add New Deck"
      }
    }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (
    prevScene &&
    prevScene.route.routeName === "Home" &&
    nextScene.route.routeName === "Deck"
  ) {
    return zoomIn();
  }
};

const Stack = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Tabs
      },
      Deck: {
        screen: Deck
      },
      AddCard: {
        screen: AddCard
      },
      QuizCard: {
        screen: QuizCard
      }
    },
    {
      transitionConfig: nav => handleCustomTransition(nav)
    }
  )
);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <Stack />
        </View>
      </Provider>
    );
  }
}
