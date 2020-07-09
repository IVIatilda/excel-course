export class Emitter {
  constructor() {
    this.liseners = {}
  }

  // Уведомляем слушателей если они есть
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array(this.liseners[event])) {
      return false
    }
    this.liseners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // Подписываемся на уведомления
  // Добавляем нового слушателя
  // formula.subscribe('table:select', () =>{})
  subscribe(event, fn) {
    this.liseners[event] = this.liseners[event] || []
    this.liseners[event].push(fn)
    return () => {
      this.liseners[event] =
        this.liseners[event].filter(listener => listener !== fn)
    }
  }
}
