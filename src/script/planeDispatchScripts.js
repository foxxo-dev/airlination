const displayTimeFormat = (remainingTimeMS) => {
  if (remainingTimeMS < 0) {
    return 0;
  } else if (remainingTimeMS < 60000) {
    return Math.round(remainingTimeMS / 1000) + 's';
  } else if (remainingTimeMS < 3600000) {
    return Math.round(remainingTimeMS / 60000) + 'min';
  } else if (remainingTimeMS < 3600000 * 24) {
    return Math.round(remainingTimeMS / 60000 / 60) + 'h';
  } else if (remainingTimeMS < 3600000 * 24 * 365) {
    return Math.round(remainingTimeMS / 60000 / 60 / 24) + 'd';
  } else if (remainingTimeMS < 3600000 * 24 * 365 * 100) {
    return Math.round(remainingTimeMS / 60000 / 60 / 24 / 365) + 'y';
  } else {
    return 'Way too ducking long...';
  }
};

export default displayTimeFormat;
