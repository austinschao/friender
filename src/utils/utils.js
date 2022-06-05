export function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


export function debounce(cb, delay = 500) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}