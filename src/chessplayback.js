/**
 * Setup the events for the static elements on the page. 
 */
export function initializeEvents(boardState) {
  document.getElementById('add-new-state').addEventListener('click', () => {
    boardState.appendMove({ value: '', isDirty: false });
  });
}