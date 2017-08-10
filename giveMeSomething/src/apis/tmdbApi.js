const API_KEY = 'fdddc52e2ed82bbeaf15dcdf4e2e153e';
const URL = 'https://api.themoviedb.org/3/discover/movie?';
const defaultParam = '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';

export const getMovies = () => {
	let url = URL+ 'api_key=' + API_KEY + defaultParam;
	return fetch(url)
	.then(res => res.json())
	.then(json => console.log(JSON.stringify(json, null, 2)))
	.catch(err => console.log(err))
}