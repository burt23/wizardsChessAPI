import { UPDATE_MESSAGE } from '../actions';

const updateMessage = (state = '', action) => {
  switch (action.type) {
    case UPDATE_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export default updateMessage;
