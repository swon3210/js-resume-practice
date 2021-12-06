export const getDebounce = (callback, duration) => {
  let timeout = null;

  return (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      callback(...args);
      timeout = null;
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

