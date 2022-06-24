import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type {RootState, AppDispatch} from '../redux/store'
import {Auth, User} from '../redux/slices/auth'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAuthSelector: TypedUseSelectorHook<Auth> = useSelector
export const useUserSelector: TypedUseSelectorHook<User> = useSelector
