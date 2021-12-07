import countries from './countries.json'
import states from './states.json'
import cities from './cities.json'

export const getCountries = () => countries

export const getStates = (idCountry) => states.filter((state) => state.id_country === parseInt(idCountry))

export const getCities = (idState) => cities.filter((city) => city.id_state === parseInt(idState))
