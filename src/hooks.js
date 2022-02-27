import { useState, useCallback, useEffect } from 'react';

export function useComplexLocalStorage(key, fallbackVal = {}) {
  const [val,setVal] = useState(getItem(key, JSON.stringify(fallbackVal)));
  const saveVal = useCallback((newVal) => {
    setItem(key, JSON.stringify(newVal));
    setVal(JSON.stringify(newVal));
  }, [key]);
  useEffect(() => {
    setVal(getItem(key, JSON.stringify(fallbackVal)));
  }, [key,fallbackVal]);
  return [JSON.parse(val),saveVal];
}

export function useLocalStorage(key, fallbackVal = null) {
  const [val,setVal] = useState(getItem(key, fallbackVal));
  const saveVal = useCallback((newVal) => {
    setItem(key, newVal);
    setVal(newVal);
  }, [key]);
  return [val,saveVal];
}

export function useLocalStorageToggle(key, fallbackVal = false) {
  const [on,setOn] = useState(getBool(key, fallbackVal));
  const toggle = useCallback(() => {
    setOn((on) => {
      setBool(key, !on);
      return !on;
    });
  }, [key]);
  const On = useCallback(() => {
    setOn(true);
    setBool(key, true);
  }, [key]);
  const Off = useCallback(() => {
    setOn(false);
    setBool(key, false);
  }, [key]);
  return [on,toggle,On,Off];
}

function setItem(key, val) {
  window.localStorage.setItem(key, val);
}

function getItem(key, fallbackValue) {
  const item = window.localStorage.getItem(key);
  return item ?? fallbackValue;
}

function setBool(key, val) {
  window.localStorage.setItem(key, val ? 'true' : 'false');
}

function getBool(key, fallbackValue) {
  const item = window.localStorage.getItem(key);
  if (item === null) return fallbackValue;
  return item === 'true';
}
