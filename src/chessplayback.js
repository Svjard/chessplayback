import { isValid } from './validator';

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

  document.getElementById('bulk-import-import').addEventListener('click', () => {
    const movesText = document.getElementById('bulk-import-moves').value;
    if (!movesText.length) {
      document.getElementById('bulk-import-moves').classList.add('invalid');
      document.getElementById('import-error').style.display = 'flex';
      return;
    }

    const moves = movesText.split('\n');

    document.getElementById('bulk-import-dialog').style.display = 'none';

    boardState.moves.push(...moves.map(m => ({ value: m })));
  });
}