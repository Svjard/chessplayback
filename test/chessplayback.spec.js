describe('Chess Playback Tests', () => {
  let getElementByIdFn,
      addEventListenerFn;
  
  beforeEach(() => {
    addEventListenerFn = jest.fn();

    getElementByIdFn = jest.fn().mockReturnValue({
      addEventListener: addEventListenerFn,
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
      expect(getElementByIdFn).toHaveBeenCalledWith('move');
    });
  });
});