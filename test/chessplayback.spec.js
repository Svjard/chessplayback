import { when } from 'jest-when';
import Chance from 'chance';
import BoardState from '../src/boardstate';
import * as sut from '../src/chessplayback';

const chance = new Chance();

describe('Chess Playback Tests', () => {
  let getElementByIdFn,
      addEventListenerFn,
      styleObj;
  
  beforeEach(() => {
    addEventListenerFn = jest.fn();
    styleObj = {
      display: chance.guid(),
    };

    getElementByIdFn = jest.fn().mockReturnValue({
      addEventListener: addEventListenerFn,
      style: styleObj,
    });

    global.document = {
      getElementById: getElementByIdFn,
    };
  });
      
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initializeEvents', () => {
    let boardState;
    
    beforeEach(() => {
      boardState = new BoardState();
      boardState.moves = [{ value: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR' }];

      when(getElementByIdFn).calledWith('add-new-state').mockReturnValue({ addEventListener: addEventListenerFn });
    });
      
    it('should setup event listeners for add new move button', () => {
      boardState.moves = [];

      sut.initializeEvents(boardState);

      expect(getElementByIdFn).toHaveBeenCalledWith('add-new-state');
      expect(addEventListenerFn.mock.calls[0][0]).toEqual('click');

      addEventListenerFn.mock.calls[0][1]();

      expect(boardState.moves).toStrictEqual([{ value: '', isDirty: false }]);
    });

    it('should setup event listener for clicking bulk import button', () => {
      boardState.moves = [];

      sut.initializeEvents(boardState);

      expect(getElementByIdFn).toHaveBeenCalledWith('bulk-import');
      expect(addEventListenerFn.mock.calls[0][0]).toEqual('click');

      addEventListenerFn.mock.calls[1][1]();

      expect(getElementByIdFn).toHaveBeenCalledWith('bulk-import-dialog');
      expect(styleObj.display).toBe('block');
    });
  });
});