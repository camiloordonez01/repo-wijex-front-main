import Axios from 'axios'

export const signIn = (data) =>
    Axios.post(`https://us-central1-clear-incentive-329822.cloudfunctions.net/WijexBack/users/signin`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    })

export const getUsers = () =>
    Axios.get(`https://us-central1-clear-incentive-329822.cloudfunctions.net/WijexBack/users/all`, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser')
        },
    })

export const getUserById = (id) =>
    Axios.get(`https://us-central1-clear-incentive-329822.cloudfunctions.net/WijexBack/users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser')
        },
    })

export const updateUserById = (id, data) =>
    Axios.put(`https://us-central1-clear-incentive-329822.cloudfunctions.net/WijexBack/users/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser')
        },
    })

export const deleteUserById = (id, uid) =>
    Axios.delete(`https://us-central1-clear-incentive-329822.cloudfunctions.net/WijexBack/users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser'),
            uidUserCustomer: uid
        },
    })
export const createUser = (data) =>
    Axios.post(`https://us-central1-clear-incentive-329822.cloudfunctions.net/WijexBack/users/create`, data, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser')
        },
    })