import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://real-clam-loafers.cyclic.app/',
  withCredentials: true
});

export default instance;
