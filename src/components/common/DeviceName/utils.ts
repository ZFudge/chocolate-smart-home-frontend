const SECONDS_IN_A_DAY = 3600 * 24;

const getTimeDifference = (epochTime: string | null) => {
  if (!epochTime) {
    return '';
  }
  const then = new Date(epochTime);
  const now = new Date();

  let difference = (now.getTime() - then.getTime()) / 1000;
  let textualDifference = '';

  const days = Math.floor(difference / SECONDS_IN_A_DAY);
  if (days) {
    textualDifference += `${days}d `;
    difference %= difference % SECONDS_IN_A_DAY;
  }

  const hours = Math.floor(difference / 3600);
  if (hours) {
    textualDifference += `${hours}h `;
    difference %= difference % 3600;
  }

  const minutes = Math.floor(difference / 60);
  if (minutes) {
    textualDifference += `${minutes}min `;
    difference %= difference % 60;
  }

  const seconds = Math.floor(difference);
  if (seconds) {
    textualDifference += `${seconds}s`;
  } else {
    return '0s';
  }

  return textualDifference;
};

export { getTimeDifference, SECONDS_IN_A_DAY };
