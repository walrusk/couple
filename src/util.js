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
  const len = high-low+1;
  return len > 0 ? [...Array(high-low+1).keys()].map(k => k + low) : [];
}

export function rand(min, max, randFn) {
  return Math.floor(randFn() * (max - min + 1) + min)
}

export function midnight_secs() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(),now.getDate() + 1,0, 0, 0);
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

export function setItem(key, val) {
  window.localStorage.setItem(key, val);
}

export function getItem(key, fallbackValue) {
  const item = window.localStorage.getItem(key);
  return item ?? fallbackValue;
}

export function setBool(key, val) {
  window.localStorage.setItem(key, val ? 'true' : 'false');
}

export function getBool(key, fallbackValue) {
  const item = window.localStorage.getItem(key);
  if (item === null) return fallbackValue;
  return item === 'true';
}
