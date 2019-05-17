import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Alert
} from "react-native";
import { addDeck } from "../actions";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { _addDeck } from "../utils/api";

function SubmitBtn({ onPress, allowSubmit }) {
  return (
    <TouchableOpacity style={styles.SubmitButton} onPress={onPress}>
      <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  );
}

class AddDeck extends Component {
  state = {
    deckName: ""
  };

  submit = () => {
    const { deckName } = this.state;
    const key = deckName.replace(/\s+/g, "");
    if (deckName.length > 2) {
      this.props.dispatch(addDeck(key, deckName));
      _addDeck(key, deckName);
      this.props.navigation.dispatch(
        NavigationActions.navigate({
          routeName: "Deck",
          params: { deckId: key, title: deckName }
        })
      );
      this.setState({
        deckName: ""
      });
    } else {
      Alert.alert(
        "Deck Name length",
        "Deck name must be more than 2 characters",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  render() {
    const { deckName } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.content}>
          Enter name of the new deck you would like to add
        </Text>
        <TextInput
          style={styles.textInput}
          maxLength={20}
          onChangeText={deckName => this.setState({ deckName })}
          value={deckName}
          placeholder="Enter Deck Name"
          autoFocus={true}
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
  content: {
    fontSize: 20,
    textAlign: "center"
  },
  SubmitButton: {
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
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: "center",
    textAlign: "center"
  }
});

export default connect()(AddDeck);
