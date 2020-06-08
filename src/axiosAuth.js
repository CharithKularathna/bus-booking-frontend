import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://us-central1-transport-booking-system-62ea6.cloudfunctions.net/app/api/'
});

export default instance;