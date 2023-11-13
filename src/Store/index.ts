import { configureStore } from '@reduxjs/toolkit'
import Selection, {actions as SelectionAction, SelectionState} from './Selection'

const store = configureStore({reducer: {
  Selection
}})

export type RootState = {
  Selection: SelectionState
}

export const actions = {
    Selection: SelectionAction
}

export default store;
