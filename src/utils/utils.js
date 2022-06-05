export function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// export function debounce_leading(fn, timeout = 300) {
//   let timer;
//   return (...args) => {
//     if (!timer) {
//       fn.apply(this, args);
//     }
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       timer = undefined;
//     }, timeout);
//   };
// }

export function debounce(fn, timeout = 5000) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), timeout);

  };
}