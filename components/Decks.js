import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { _receiveDecks } from "../utils/api";
import { receiveDecks } from "../actions";
import { AppLoading } from "expo";

function DeckCard({ questionsCount, cardname, navigate }) {
  return (
    <TouchableOpacity style={styles.deckCard} onPress={navigate}>
      <Text style={styles.deckCardTitle}>{cardname}</Text>
      <Text style={styles.deckCardText}>{questionsCount} cards</Text>
    </TouchableOpacity>
  );
}

class Decks extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;

    _receiveDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() =>
        this.setState(() => ({
          ready: true
        }))
      );
  }

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.heading}>Decks</Text>
        <View>
          {Object.keys(decks).map(key => {
            const cardname = decks[key].title;
            const questionsCount = decks[key].questions.length;
            return (
              <DeckCard
                key={key}
                questionsCount={questionsCount}
                cardname={cardname}
                navigate={() => {
                  this.props.navigation.navigate("Deck", {
                    deckId: key,
                    title: cardname
                  });
                }}
              />
            );
          })}
          {Object.keys(decks).length === 0 && (
            <Text style={styles.content}>
              There are no decks created. You can get started by adding a new
              deck
            </Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 30,
    textAlign: "center"
  },
  deckCard: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  deckCardTitle: {
    fontSize: 22,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5
  },
  deckCardText: {
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 5
  },
  content: {
    fontSize: 20,
    textAlign: "center"
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Decks);
