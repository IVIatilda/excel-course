import {storage} from '@core/utils';

function toHTML(key) {
  const table = storage(key)
  const uri = '#' + key.replace(':', '/')
  const date = new Date(table.date)
  return `
    <li class="db__record">
      <a href="${uri}">${table.title}</a>
      <strong>
        ${date.toLocaleDateString()} ${date.toLocaleTimeString()}
      </strong>
    </li>
  `
}

export function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if (keys.length == 0) {
    return `<div class="db__table db__view">
      <p>Вы пока не создали ни одной таблицы</p>
    </div>`
  }

  return `<div class="db__table db__view">
      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>
      <ul class="db__list">
        ${keys.map(toHTML).join('')}
      </ul>
    </div>`
}
