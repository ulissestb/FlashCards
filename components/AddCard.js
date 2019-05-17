import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Alert
} from "react-native";
import { addCard } from "../actions";
import { connect } from "react-redux";
import { _addCardToDeck } from "../utils/api";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity style={styles.SubmitButton} onPress={onPress}>
      <Text style={styles.submitBtnText}>Add Card</Text>
    </TouchableOpacity>
  );
}

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    };
  };

  state = {
    question: "",
    answer: ""
  };

  submit = () => {
    const { question, answer } = this.state;
    const { deckId, addCardToDeck, goBack, deck } = this.props;

    if (question.length > 0 && answer.length > 0) {
      addCardToDeck(deckId, question, answer);
      const questionAndAnswer = {
        question: question,
        answer: answer
      };

      const updatedDeck = {
        title: deck.title,
        questions: deck.questions.concat(questionAndAnswer)
      };
      _addCardToDeck(deckId, updatedDeck);
      this.setState({
        question: "",
        answer: ""
      });

      Alert.alert(
        "Card Added",
        "Successfully added card to the deck",
        [{ text: "OK" }],
        { cancelable: false }
      );

      goBack();
    } else {
      Alert.alert(
        "Empty Question/Answer",
        "The question and/or the answer is empty. Please have some value.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.heading}>Add Card</Text>
        <TextInput
          style={styles.textInput}
          maxLength={50}
          onChangeText={question => this.setState({ question })}
          value={question}
          placeholder="Question here"
          autoFocus={true}
        />
        <TextInput
          style={styles.textInput}
          maxLength={50}
          multiLine={true}
          numberOfLines={3}
          onChangeText={answer => this.setState({ answer })}
          value={answer}
          placeholder="Answer here"
        />
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 30,
    marginRight: 30
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center"
  },
  content: {
    fontSize: 20,
    color: "blue",
    textAlign: "center"
  },
  SubmitButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    height: 45,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: "center"
  },
  textInput: {
    height: 50,
    width: 225,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    textAlign: "center"
  }
});

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: decks[deckId]
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
    addCardToDeck: (deckId, question, answer) => {
      dispatch(addCard(deckId, question, answer));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);
