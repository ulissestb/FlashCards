import { AsyncStorage } from "react-native";

const STORAGE_KEY = "Flashcards:deck:";

export const _receiveDecks = async () => {
  const allKeys = await AsyncStorage.getAllKeys();

  const storedDecks = await AsyncStorage.multiGet(allKeys);
  let decks = {};
  for (const storedDeck of storedDecks) {
    const key = storedDeck[0];
    if (key.includes(STORAGE_KEY)) {
      decks[key.replace(STORAGE_KEY, "")] = JSON.parse(storedDeck[1]);
    }
  }
  return decks;
};

export const _addDeck = (key, title) => {
  const storageKey = STORAGE_KEY + key;
  const newDeck = { title, questions: [] };
  return AsyncStorage.setItem(storageKey, JSON.stringify(newDeck));
};

export const _addCardToDeck = (key, updatedDeck) => {
  const storageKey = STORAGE_KEY + key;

  return AsyncStorage.mergeItem(storageKey, JSON.stringify(updatedDeck));
};

export const _removeItem = key => {
  AsyncStorage.removeItem(STORAGE_KEY + key);
};
