import axios from 'axios';

export const Get = (collection, params) => { 
	return axios.get(`http://localhost:3000${collection}`,params)
}

export const Post = (collection, params) => { 
	return axios.post(`http://localhost:3000${collection}`,params)
}
