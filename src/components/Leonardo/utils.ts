import { LOCK, MOVE, TALON, UNLOCK } from './constants';
import { LeonardoCommand } from './types';

export const getColor = (command: LeonardoCommand) => {
  switch (command) {
    case MOVE:
      return 'green';
    case LOCK:
      return 'blue';
    case UNLOCK:
      return 'red';
    case TALON:
      return 'yellow';
    default:
      return 'gray';
  }
};
