import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.$el.dataset.resize
  let delta

  document.onmousemove = e => {
    if (type=='col') {
      delta = e.pageX - coords.right
      $resizer.css({right: -delta + 'px'})
    } else {
      delta = e.pageY - coords.bottom
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type=='col') {
      const value = coords.width + delta
      $resizer.css({right: '0px'})
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    } else {
      const value = coords.height + delta
      $parent.css({height: value + 'px'})
      $resizer.css({bottom: '0px'})
    }
  }
}
