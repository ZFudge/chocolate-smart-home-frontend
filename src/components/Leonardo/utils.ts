import { LeonardoCommand } from "./types";
import { LOCK, MOVE, TALON, UNLOCK } from "./constants";

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
