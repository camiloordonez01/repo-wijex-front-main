import Axios from 'axios'

export const signIn = (data) =>
    Axios.post(`http://localhost:3000/users/signin`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

export const getUsers = () =>
    Axios.get(`http://localhost:3000/users/all`, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser')
        },
    })

export const getUserById = (id) =>
    Axios.get(`http://localhost:3000/users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser')
        },
    })

export const updateUserById = (id, data) =>
    Axios.put(`http://localhost:3000/users/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser')
        },
    })

export const deleteUserById = (id, uid) =>
    Axios.delete(`http://localhost:3000/users/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser'),
            uidUserCustomer: uid
        },
    })