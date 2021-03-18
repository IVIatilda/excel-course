import {defaultStyles, defaultTitle} from '@/constants'
import {clone} from '../core/utils'

const defaultState = {
  title: defaultTitle,
  date: (new Date).toJSON(),
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
