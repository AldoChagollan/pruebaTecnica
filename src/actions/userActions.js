export const loginUser = token => ({
    type: "LoginUser",
    payload: token
})
export const onLoading = () => ({
    type: "OnLoading",
    payload: ""
})
export const onError = error => ({
    type: "OnError",
    payload: error
})
export const getUsers = users => ({
    type: "GetUsers",
    payload: users
})
export const getSearch = search => ({
    type: "GetSearch",
    payload: search
})
export const onSearch = search => ({
    type: "OnSearch",
    payload: search
})
export const createUser = user => ({
    type: "CreateUser",
    payload: user
})