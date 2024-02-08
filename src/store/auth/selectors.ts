import type { RootState } from "../store";

// Other code such as selectors can use the imported `RootState` type
export const createAuth = (state: RootState) => state.auth.createUsers;
export const loginAuth = (state: RootState) => state.auth.loginUser;
