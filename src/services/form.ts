import Axios from 'axios'

export const upload = (data) =>
    Axios.post(`http://localhost:3000/form`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

export const getToken = (token) =>
    Axios.get(`https://api.wijex.com/lcodes/${token}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

export const cambiarEstadoToken = ( id) =>
    Axios.put(
        `https://api.wijex.com/lcodes/actstat/${id}`,
        {
            estado: 1,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
