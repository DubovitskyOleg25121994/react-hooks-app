import axios from 'axios';

export const instance = axios.create({
	baseURL: 'http://api.citybik.es',
	headers: {
		'Content-Type': 'application/json '
	}
});
