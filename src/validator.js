import { SQUARES_H, SQUARES_V } from './constants';

export function isInvalidCharacter(c) {
  if (!c || !c.match) {
    return true;
  }

  return !c.match(/[PKNQKBRpknqkbr1-8]/);
}

export function isValid(str) {
  const rows = str.split('/');
  if (rows.length !== SQUARES_H) {
    return false;
  }

  return rows.every(r => {
    const columns = r.split('');
    if (columns.some(c => isInvalidCharacter(c))) {
      return false;
    }

    return columns.reduce((prev, curr) => prev + (curr.match(/\d/) ? Number(curr) : 1), 0) === SQUARES_V;
  });
}