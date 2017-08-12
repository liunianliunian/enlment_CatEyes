import axios from 'axios';

export const Get = (collection, params) => { 
	return axios.get(`http://localhost:3000${collection}`,params)
}

export const Post = (collection, params) => { 
	return axios.post(`http://localhost:3000${collection}`,params)
}

export const getTime = () =>{
	var date = new Date();
	var month = date.getMonth() >9 ?  date.getMonth() : "0"+date.getMonth()
	var day = date.getDate() > 9 ? date.getDate() : "0"+ date.getDate()
	return  `${date.getFullYear()}-${month}-${day}`
}