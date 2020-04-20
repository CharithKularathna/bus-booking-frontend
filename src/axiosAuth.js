import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://transport-booking-system.herokuapp.com/api/'
});

export default instance;