export class TableSelection {
  static className = 'selected'

  constructor() {
    this.grop = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.grop.push($el)
    $el.focus().addClass(TableSelection.className)
    this.current = $el
  }

  clear() {
    this.grop.forEach($el => {
      $el.removeClass(TableSelection.className)
    })
    this.grop = []
  }

  selectGroup($root, start, finish) {
    this.clear()
    if (start.row > finish.row) {
      const i = start.row
      start.row = finish.row
      finish.row = i
    }
    if (start.col > finish.col) {
      const j = start.col
      start.col = finish.col
      finish.col = j
    }
    for (let i = start.row; i <= finish.row; i++) {
      for (let j = start.col; j <= finish.col; j++) {
        const $cell = $root.find(`[data-id="${i}:${j}"]`)
        this.grop.push($cell)
        $cell.addClass(TableSelection.className)
      }
    }
  }
}
