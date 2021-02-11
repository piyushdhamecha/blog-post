import { createSelector } from 'reselect'

const authSelector = (state) => state.auth

export const getAuthUserSelector = createSelector([authSelector], (auth) => auth.user)
