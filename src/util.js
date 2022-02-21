export function shuffle(arr, randFn) {
  let currIndex = arr.length;
  let randIndex;
  while (currIndex !== 0) {
    randIndex = Math.floor(randFn() * currIndex);
    currIndex--;
    [arr[currIndex], arr[randIndex]] = [arr[randIndex], arr[currIndex]];
  }
  return arr;
}

export function range(low, high) {
  return [...Array(high-low+1).keys()].map(k => k + low)
}

export function rand(min, max, randFn) {
  return Math.floor(randFn() * (max - min + 1) + min)
}
