 
import axios from 'axios';

export const getUser = (col,params) => { return axios.post(`http://localhost:3000${col}`, params)}


