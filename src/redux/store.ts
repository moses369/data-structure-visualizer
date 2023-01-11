import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../AppSlice'
import linkedListReducer from '../components/DataStructures/LinkedList/LinkedListSlice'
export const store = configureStore({
  reducer: {
    app:appReducer,
    linkedList:linkedListReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch