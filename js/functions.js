export const addZero = (n) => n < 10 ? '0' + n : n;
export const getNextIndexInArr = (current, array) => array[current + 1] === undefined ? 0 : ++current;
export const getPrevIndexInArr = (current, array) => array[current - 1] === undefined ? array.length - 1 : --current;