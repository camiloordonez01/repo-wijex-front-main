import Axios from 'axios'

export const upload = (data) =>
    Axios.post(`https://us-central1-clear-incentive-329822.cloudfunctions.net/WijexBack/form`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
export const getForms = () =>
    Axios.get(`https://us-central1-clear-incentive-329822.cloudfunctions.net/WijexBack/form/all`, {
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser')
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

export const actualizarEstado = (id, estado) =>
    Axios.patch(`https://us-central1-clear-incentive-329822.cloudfunctions.net/WijexBack/form/estado/${id}`, {
        estado
    },{
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser')
        },
    })


export const actualizarResponsable = (id, responsable) =>
    Axios.patch(`https://us-central1-clear-incentive-329822.cloudfunctions.net/WijexBack/form/responsable/${id}`, {
        responsable
    },{
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser')
        },
    })

export const actualizarImagenes = (id, imagen) =>
    Axios.patch(`https://us-central1-clear-incentive-329822.cloudfunctions.net/WijexBack/form/imagenes/${id}`, {
        imagen
    },{
        headers: {
            'Content-Type': 'application/json',
            accessToken: localStorage.getItem('accessToken'),
            uidUser : localStorage.getItem('uidUser')
        },
    })
