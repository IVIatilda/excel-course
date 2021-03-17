export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    $el.focus().addClass(TableSelection.className)
    this.group.push($el)
    this.current = $el
  }

  clear() {
    this.group.forEach($el => {
      $el.removeClass(TableSelection.className)
    })
    this.group = []
  }

  get selectedIds() {
    return this.group.map( $el => $el.id())
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
        this.group.push($cell)
        $cell.addClass(TableSelection.className)
      }
    }
  }

  /*
  selectGroup($grop = []) {
    this.clear()
    this.group = $grop
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
  */

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}
