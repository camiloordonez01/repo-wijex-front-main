import Axios from 'axios'

const endpoint = "https://maps.googleapis.com/maps/api/geocode/json"
const key = "AIzaSyDc0AUEXQNzsy8vPiPimCoTgUOJZLKLGU0"

export const getPosition = (address) => 
    Axios.get(endpoint, {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            address: address,
            key 
        }
    })
