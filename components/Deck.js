import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    };
  };

  render() {
    const { deckId, deck } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.heading}>{deck.title}</Text>
        <Text style={styles.content}>
          Number of Cards: {deck.questions.length}
        </Text>
        {deck.questions.length === 0 ? (
          <Text style={styles.content}>
            To start the quiz, you will have to add atleast 1 card
          </Text>
        ) : (
          <Text style={styles.content}>
            Would you like to take the quiz or add a new card?
          </Text>
        )}
        <TouchableOpacity
          style={styles.options}
          onPress={() => {
            this.props.navigation.navigate("AddCard", {
              deckId: deckId,
              title: deck.title
            });
          }}
        >
          <Text style={styles.optionsText}>Add Card</Text>
        </TouchableOpacity>
        {deck.questions.length !== 0 && (
          <TouchableOpacity
            style={styles.options}
            onPress={() => {
              this.props.navigation.navigate("QuizCard", { deckId: deckId });
            }}
          >
            <Text style={styles.optionsText}>Start a Quiz</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    fontSize: 18,
    padding: 30,
    textAlign: "center"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 30,
    textAlign: "center"
  },
  options: {
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
  optionsText: {
    fontSize: 22,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
});

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: state[deckId]
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack()
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
