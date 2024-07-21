/**
 * Setup the events for the static elements on the page. 
 */
export function initializeEvents(boardState) {
  document.getElementById('add-new-state').addEventListener('click', () => {
    boardState.appendMove({ value: '', isDirty: false });
  });

  document.getElementById('bulk-import').addEventListener('click', () => {
    document.getElementById('bulk-import-dialog').style.display = 'block';
  });

  document.getElementById('bulk-import-cancel').addEventListener('click', () => {
    document.getElementById('bulk-import-dialog').style.display = 'none';
  });
}