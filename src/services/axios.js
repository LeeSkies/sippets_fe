import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cheerful-jade-marlin.cyclic.app',
  withCredentials: true
});

export default instance;
