import {ADD_DECK,RECEIVE_DECKS,ADD_CARD} from '../actions'

function decks(state={},action){
  switch(action.type){
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deckname]: {
          title: action.title,
          questions: []
        }
      }
    case ADD_CARD:
      return {
        ...state,
        [action.deckname]: {
          ...state[action.deckname],
          questions: [
            ...state[action.deckname].questions,
            {
              question: action.question,
              answer: action.answer
            }
          ]
        }
      }
    default:
      return state
  }
}

export default decks
