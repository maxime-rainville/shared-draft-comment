import { createAction, createReducer } from '@reduxjs/toolkit'
import { InlineSelection } from '../lib/InlineSelection'
import { Comment } from '../lib/Comment'

interface User {
  id: string
  name: string
  email?: string
  avatar?: string
  colour?: string
}

export interface SelectionState {
  selections: InlineSelection[],
  comments: Comment[],
  activeSelectionId: string | null,
  users: User[]
  activeUser: User | null,
}

const register = createAction<InlineSelection>('selection/register')
const commentOn = createAction<string>('selection/comment-on')
const recallComment = createAction<Comment>('selection/recall-comment')
const newComment = createAction<{selectionId: string, text: string}>('selection/new-comment')
const addUser = createAction<{user: User, active?: Boolean}>('selection/add-user')
const setCurrentUser = createAction<string>('selection/set-current-user')
export const actions = { register, commentOn, newComment, addUser, setCurrentUser, recallComment} 


const initial: SelectionState = {
  selections: [],
  comments: [],
  activeSelectionId: null,
  users: [],
  activeUser: null,
}

const reducer = createReducer(initial, (builder) => {
    builder
      .addCase(register, (state, action) => {
        if (state.selections.find(s => s.id === action.payload.id)) {
          return
        }
        state.selections =  [...state.selections, action.payload]
        state.activeSelectionId = action.payload.id
      })
      .addCase(commentOn, (state, action) => {
        state.activeSelectionId = null
        if (state.selections.find(s => s.id === action.payload)) {
          state.activeSelectionId = action.payload
        }
      })
      .addCase(newComment, (state, action) => {
        if (!state.activeSelectionId) {
          console.error('No active selection')
          return
        }
        
        if (!state.activeUser) {
          console.error('No active user')
          return
        }
        state.comments = [...state.comments, {
          selectionId: action.payload.selectionId,
          text: action.payload.text,
          id: Math.random().toString(),
          created: new Date(),
          userId: state.activeUser.id,
        }]
      })
      .addCase(recallComment, (state, action) => {
        state.comments = [...state.comments, action.payload]
      })
      .addCase(addUser, (state, {payload: {user, active} }) => {
        let currentUser = state.users.find(u => u.id === user.id)
        if (!currentUser) {
          state.users = [...state.users, user]
          currentUser = user
        }
        if (active) {
          state.activeUser = currentUser || null
        }
      })
      .addCase(setCurrentUser, (state, {payload}) => {
        const activeUser = state.users.find(u => u.id === payload)
        state.activeUser = activeUser || null
      })

  });



export default reducer;