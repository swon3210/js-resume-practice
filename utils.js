export const getDebounce = (callback, duration) => {
  let timeout;
  let passedTime = 0;

  return (...args) => {
    if (passedTime > duration) {
      return;
    }

    clearTimeout(timeout);
    timer = setTimeout(() => {
      callback(...args);
    }, duration);
  };
};

export const getThrottle = (callback, duration) => {
  let then = 0;

  return (...args) => {
    let now = new Date().getTime();

    if (now - then < duration) {
      return;
    }

    then = now;
    callback(...args);
  };
};

