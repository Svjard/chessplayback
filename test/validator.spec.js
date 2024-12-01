import Chance from 'chance';
import * as sut from '../src/validator';
import example from './example';

const chance = new Chance();

describe('Validator Test Suite', () => {
  describe('isInvalidCharacter', () => {
    it('should return false if c is falsy', () => {
      expect(sut.isInvalidCharacter(null)).toEqual(true);
      expect(sut.isInvalidCharacter(undefined)).toEqual(true);
    });

    it('should return false if c is not a string', () => {
      expect(sut.isInvalidCharacter(1)).toEqual(true);
      expect(sut.isInvalidCharacter(false)).toEqual(true);
    });

    it('should return true for black pieces', () => {
      expect(sut.isInvalidCharacter('r')).toEqual(false);
      expect(sut.isInvalidCharacter('b')).toEqual(false);
      expect(sut.isInvalidCharacter('n')).toEqual(false);
      expect(sut.isInvalidCharacter('q')).toEqual(false);
      expect(sut.isInvalidCharacter('k')).toEqual(false);
      expect(sut.isInvalidCharacter('p')).toEqual(false);
    });

    it ('should return true for white pieces', () => {
      expect(sut.isInvalidCharacter('R')).toEqual(false);
      expect(sut.isInvalidCharacter('B')).toEqual(false);
      expect(sut.isInvalidCharacter('N')).toEqual(false);
      expect(sut.isInvalidCharacter('Q')).toEqual(false);
      expect(sut.isInvalidCharacter('K')).toEqual(false);
      expect(sut.isInvalidCharacter('P')).toEqual(false);
    });

    it ('should return true for empty square values', () => {
      expect(sut.isInvalidCharacter('1')).toEqual(false);
      expect(sut.isInvalidCharacter('2')).toEqual(false);
      expect(sut.isInvalidCharacter('3')).toEqual(false);
      expect(sut.isInvalidCharacter('4')).toEqual(false);
      expect(sut.isInvalidCharacter('5')).toEqual(false);
      expect(sut.isInvalidCharacter('6')).toEqual(false);
      expect(sut.isInvalidCharacter('7')).toEqual(false);
      expect(sut.isInvalidCharacter('8')).toEqual(false);
    });

    it ('should return false for a value <1 or >8', () => {
      expect(sut.isInvalidCharacter('0')).toEqual(true);
      expect(sut.isInvalidCharacter('9')).toEqual(true);
    });

    it ('should return false for invalid alpha values', () => {
      expect(sut.isInvalidCharacter('a')).toEqual(true);
      expect(sut.isInvalidCharacter('c')).toEqual(true);
      expect(sut.isInvalidCharacter('d')).toEqual(true);
      expect(sut.isInvalidCharacter('e')).toEqual(true);
      expect(sut.isInvalidCharacter('f')).toEqual(true);
      expect(sut.isInvalidCharacter('h')).toEqual(true);
      expect(sut.isInvalidCharacter('i')).toEqual(true);
      expect(sut.isInvalidCharacter('j')).toEqual(true);
      expect(sut.isInvalidCharacter('l')).toEqual(true);
      expect(sut.isInvalidCharacter('m')).toEqual(true);
      expect(sut.isInvalidCharacter('o')).toEqual(true);
      expect(sut.isInvalidCharacter('s')).toEqual(true);
      expect(sut.isInvalidCharacter('t')).toEqual(true);
      expect(sut.isInvalidCharacter('u')).toEqual(true);
      expect(sut.isInvalidCharacter('v')).toEqual(true);
      expect(sut.isInvalidCharacter('w')).toEqual(true);
      expect(sut.isInvalidCharacter('x')).toEqual(true);
      expect(sut.isInvalidCharacter('y')).toEqual(true);
      expect(sut.isInvalidCharacter('z')).toEqual(true);
    });
  });

  describe('isValid', () => {
    it ('should return false if incorrect number of rows', () => {
      const t = chance.n(() => chance.integer({ min: 0, max: 50, exclude: [8] }), 20);
      t.forEach(i => {
        expect(sut.isValid(new Array(i).fill('/').join(''))).toEqual(false);
      });
    });

    it ('should return false if row has invalid character', () => {
      expect(sut.isValid('//g/////')).toEqual(false);
      expect(sut.isValid('///4g2////')).toEqual(false);
      expect(sut.isValid('////rbQw///')).toEqual(false);
      expect(sut.isValid('/ppp/4/4//l//')).toEqual(false);
      expect(sut.isValid('o///////')).toEqual(false);
      expect(sut.isValid('///////i')).toEqual(false);
    });

    it ('should return false if row has invalid number of pieces', () => {
      expect(sut.isValid('//ppppppppp/////')).toEqual(false);
      expect(sut.isValid('///4K5////')).toEqual(false);
      expect(sut.isValid('////rbpbpbpQK///')).toEqual(false);
      expect(sut.isValid('//2p2p2p2p2/////')).toEqual(false);
      expect(sut.isValid('88///////')).toEqual(false);
      expect(sut.isValid('///////1111111111')).toEqual(false);
    });

    it ('should return true for valid states', () => {
      example.forEach(r => {
        expect(sut.isValid(r)).toEqual(true);
      });
    });
  });

  describe('isInvalidCharacter', () => {
    it('should return false if c is falsy', () => {
      expect(sut.isInvalidCharacter(null)).toEqual(true);
      expect(sut.isInvalidCharacter(undefined)).toEqual(true);
    });

    it('should return false if c is not a string', () => {
      expect(sut.isInvalidCharacter(1)).toEqual(true);
      expect(sut.isInvalidCharacter(false)).toEqual(true);
    });

    it('should return true for black pieces', () => {
      expect(sut.isInvalidCharacter('r')).toEqual(false);
      expect(sut.isInvalidCharacter('b')).toEqual(false);
      expect(sut.isInvalidCharacter('n')).toEqual(false);
      expect(sut.isInvalidCharacter('q')).toEqual(false);
      expect(sut.isInvalidCharacter('k')).toEqual(false);
      expect(sut.isInvalidCharacter('p')).toEqual(false);
    });

    it ('should return true for white pieces', () => {
      expect(sut.isInvalidCharacter('R')).toEqual(false);
      expect(sut.isInvalidCharacter('B')).toEqual(false);
      expect(sut.isInvalidCharacter('N')).toEqual(false);
      expect(sut.isInvalidCharacter('Q')).toEqual(false);
      expect(sut.isInvalidCharacter('K')).toEqual(false);
      expect(sut.isInvalidCharacter('P')).toEqual(false);
    });

    it ('should return true for empty square values', () => {
      expect(sut.isInvalidCharacter('1')).toEqual(false);
      expect(sut.isInvalidCharacter('2')).toEqual(false);
      expect(sut.isInvalidCharacter('3')).toEqual(false);
      expect(sut.isInvalidCharacter('4')).toEqual(false);
      expect(sut.isInvalidCharacter('5')).toEqual(false);
      expect(sut.isInvalidCharacter('6')).toEqual(false);
      expect(sut.isInvalidCharacter('7')).toEqual(false);
      expect(sut.isInvalidCharacter('8')).toEqual(false);
    });

    it ('should return false for a value <1 or >8', () => {
      expect(sut.isInvalidCharacter('0')).toEqual(true);
      expect(sut.isInvalidCharacter('9')).toEqual(true);
    });

    it ('should return false for invalid alpha values', () => {
      expect(sut.isInvalidCharacter('a')).toEqual(true);
      expect(sut.isInvalidCharacter('c')).toEqual(true);
      expect(sut.isInvalidCharacter('d')).toEqual(true);
      expect(sut.isInvalidCharacter('e')).toEqual(true);
      expect(sut.isInvalidCharacter('f')).toEqual(true);
      expect(sut.isInvalidCharacter('h')).toEqual(true);
      expect(sut.isInvalidCharacter('i')).toEqual(true);
      expect(sut.isInvalidCharacter('j')).toEqual(true);
      expect(sut.isInvalidCharacter('l')).toEqual(true);
      expect(sut.isInvalidCharacter('m')).toEqual(true);
      expect(sut.isInvalidCharacter('o')).toEqual(true);
      expect(sut.isInvalidCharacter('s')).toEqual(true);
      expect(sut.isInvalidCharacter('t')).toEqual(true);
      expect(sut.isInvalidCharacter('u')).toEqual(true);
      expect(sut.isInvalidCharacter('v')).toEqual(true);
      expect(sut.isInvalidCharacter('w')).toEqual(true);
      expect(sut.isInvalidCharacter('x')).toEqual(true);
      expect(sut.isInvalidCharacter('y')).toEqual(true);
      expect(sut.isInvalidCharacter('z')).toEqual(true);
    });
  });

  describe('isValid', () => {
    it ('should return false if incorrect number of rows', () => {
      const t = chance.n(() => chance.integer({ min: 0, max: 50, exclude: [8] }), 20);
      t.forEach(i => {
        expect(sut.isValid(new Array(i).fill('/').join(''))).toEqual(false);
      });
    });

    it ('should return false if row has invalid character', () => {
      expect(sut.isValid('//g/////')).toEqual(false);
      expect(sut.isValid('///4g2////')).toEqual(false);
      expect(sut.isValid('////rbQw///')).toEqual(false);
      expect(sut.isValid('/ppp/4/4//l//')).toEqual(false);
      expect(sut.isValid('o///////')).toEqual(false);
      expect(sut.isValid('///////i')).toEqual(false);
    });

    it ('should return false if row has invalid number of pieces', () => {
      expect(sut.isValid('//ppppppppp/////')).toEqual(false);
      expect(sut.isValid('///4K5////')).toEqual(false);
      expect(sut.isValid('////rbpbpbpQK///')).toEqual(false);
      expect(sut.isValid('//2p2p2p2p2/////')).toEqual(false);
      expect(sut.isValid('88///////')).toEqual(false);
      expect(sut.isValid('///////1111111111')).toEqual(false);
    });

    it ('should return true for valid states', () => {
      example.forEach(r => {
        expect(sut.isValid(r)).toEqual(true);
      });
    });
  });
});