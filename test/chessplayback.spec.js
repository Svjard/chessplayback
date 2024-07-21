import { when } from 'jest-when';
import Chance from 'chance';
import BoardState from '../src/boardstate';
import * as sut from '../src/chessplayback';

const chance = new Chance();

describe('Chess Playback Tests', () => {
  let getElementByIdFn,
      addEventListenerFn,
      getElementByIdMock,
      styleObj,
      classListObj;
  
  beforeEach(() => {
    addEventListenerFn = jest.fn();
    styleObj = {
      display: chance.guid(),
    };

    classListObj = {
      add: jest.fn(),
    };

    getElementByIdMock = {
      addEventListener: addEventListenerFn,
      classList: classListObj,
      style: styleObj,
    };

    getElementByIdFn = jest.fn().mockReturnValue(getElementByIdMock);

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
      expect(addEventListenerFn.mock.calls[1][0]).toEqual('click');

      addEventListenerFn.mock.calls[1][1]();

      expect(getElementByIdFn).toHaveBeenCalledWith('bulk-import-dialog');
      expect(styleObj.display).toBe('block');
    });

    it('should setup event listener for clicking bulk import cancel button', () => {
      boardState.moves = [];

      sut.initializeEvents(boardState);

      expect(getElementByIdFn).toHaveBeenCalledWith('bulk-import-cancel');
      expect(addEventListenerFn.mock.calls[2][0]).toEqual('click');

      addEventListenerFn.mock.calls[2][1]();

      expect(getElementByIdFn).toHaveBeenCalledWith('bulk-import-dialog');
      expect(styleObj.display).toBe('none');
    });

    describe('bulk import dialog :: submit button', () => {
      it('should setup event listener for clicking import button', () => {
        boardState.moves = [];

        sut.initializeEvents(boardState);

        expect(getElementByIdFn).toHaveBeenCalledWith('bulk-import-import');
        expect(addEventListenerFn.mock.calls[3][0]).toEqual('click');
      });

      it('should handle validation of an empty text area', () => {
        getElementByIdMock.value = '';
        
        boardState.moves = [];

        sut.initializeEvents(boardState);

        addEventListenerFn.mock.calls[3][1]();

        expect(getElementByIdFn).toHaveBeenNthCalledWith(5, 'bulk-import-moves');
        expect(getElementByIdFn).toHaveBeenNthCalledWith(6, 'bulk-import-moves');
        expect(getElementByIdFn).toHaveBeenCalledWith('import-error');
        expect(classListObj.add).toHaveBeenCalledWith('invalid');
        expect(styleObj.display).toBe('flex');
        expect(getElementByIdFn).not.toHaveBeenCalledWith('bulk-import-dialog');
      });

      it('should add moves from the text area', () => {
        const expectedMoves = chance.n(chance.guid, chance.d6());
        
        getElementByIdMock.value = expectedMoves.join('\n');
        
        boardState.moves = [];

        sut.initializeEvents(boardState);

        addEventListenerFn.mock.calls[3][1]();

        expect(getElementByIdFn).toHaveBeenCalledWith('bulk-import-dialog');
        expect(styleObj.display).toBe('none');
        expect(boardState.moves).toStrictEqual(expectedMoves.map(m => ({ value: m })));
      });
    });
  });
});