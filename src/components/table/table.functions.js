export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type
}

export function nextSelector(key, {col, row}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break;
    case 'Tab':
    case 'ArrowRight':
      col++
      break;
    case 'ArrowLeft':
      col--
      break;
    case 'ArrowUp':
      row--
      break;
  }
  return `[data-id="${row}:${col}"]`
}
