import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

function SubmitBtn({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.SubmitButton} onPress={onPress}>
      <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  );
}

class QuizCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    };
  };

  state = {
    index: 0,
    correct: 0,
    showAnswer: false
  };

  handleAnswer = text => {
    this.setState(state => ({
      index: state.index + 1,
      correct: text === "correct" ? state.correct + 1 : state.correct,
      showAnswer: !state.showAnswer
    }));
  };

  goBackToDeck = () => {
    this.props.goBack();
  };

  handleShowAnswer = () => {
    this.setState(state => ({
      showAnswer: !state.showAnswer
    }));
  };

  handleRestart = () => {
    this.setState({
      showAnswer: false,
      correct: 0,
      index: 0
    });
  };

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  render() {
    const { index, correct, showAnswer } = this.state;
    const { questions } = this.props;
    const totalCount = questions.length;

    return (
      <View style={{ flex: 1 }}>
        {index < totalCount ? (
          showAnswer ? (
            <View behavior="padding" style={styles.container}>
              <Text style={styles.content}>
                Question {index + 1} of {totalCount}
              </Text>
              <Text style={styles.heading}>
                Answer : {questions[index].answer}
              </Text>
              <Button
                title="Show Question"
                color="#85BD87"
                onPress={this.handleShowAnswer}
              >
                Show Question
              </Button>
              <SubmitBtn
                text="Correct"
                onPress={() => this.handleAnswer("correct")}
              />
              <SubmitBtn
                text="Incorrect"
                onPress={() => this.handleAnswer("incorrect")}
              />
            </View>
          ) : (
            <View behavior="padding" style={styles.container}>
              <Text style={styles.content}>
                Question {index + 1} of {totalCount}
              </Text>
              <Text style={styles.heading}>{questions[index].question}</Text>
              <Button
                title="Show Answer"
                color="#85BD87"
                style={{ borderRadius: 5 }}
                onPress={this.handleShowAnswer}
              >
                Show Answer
              </Button>
            </View>
          )
        ) : (
          <View behavior="padding" style={styles.container}>
            <Text style={styles.heading}>You have scored</Text>
            <Text style={styles.heading}>
              {correct} out of {totalCount}
            </Text>
            <SubmitBtn text="Restart Quiz" onPress={this.handleRestart} />
            <SubmitBtn text="Back to Deck" onPress={this.goBackToDeck} />
          </View>
        )}
      </View>
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
    padding: 30,
    textAlign: "center"
  },
  content: {
    fontSize: 20,
    textAlign: "center"
  },

  SubmitButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    padding: 30,
    width: 300,
    borderRadius: 5,
    height: 25,
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
    height: 40,
    width: 200,
    borderWidth: 2,
    alignSelf: "center",
    textAlign: "center"
  }
});

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    questions: decks[deckId].questions
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
)(QuizCard);
