import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTitle} from '@redux/actions'
import {defaultTitle} from '../../constants'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prerare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
    <input type="text" class="input" value="${title}" />
    <div>
      <div class="button" data-action="delete">
        <span class="material-icons" data-action="delete">delete</span>
      </div>
        <a href="#dashboard" class="button" data-action="exit">
          <span class="material-icons" data-action="exit">exit_to_app</span>
       </a>
    </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.action == 'delete') {
      const decision = confirm('Удалить?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.action == 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
