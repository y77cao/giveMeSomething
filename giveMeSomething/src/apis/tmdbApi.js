const API_KEY = 'fdddc52e2ed82bbeaf15dcdf4e2e153e';
const URL = 'https://api.themoviedb.org/3/discover/movie?';
const defaultParam = '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&';

export const getMovies = (message, page) => {
     let baseUrl = URL+ 'api_key=' + API_KEY + defaultParam;
     let query = formParam(message,page);
     //If input message cannot form a search query(return -1)
     if (query === -1) {
     	return new Promise((resolve,reject) => reject(-1));
     }
     //If query formed
     baseUrl += query;
     console.log("Search query is: " + baseUrl);
	return fetch(baseUrl)
	.then(res => res.json())
	//.then(json => console.log(JSON.stringify(json, null, 2)))
	.catch(err => console.log(err))
}

const formParam = (message, page) => {
	var genreID = [];
	var param = 'with_genres=';
	if (message === 'interesting' || 
		message === 'excited' || 
		message === 'exciting') genreID.push(12);

	if (message === 'intense' || 
	    message === 'excited' || 
	    message === 'exciting') genreID.push(28);

	if (message === 'cute' || 
	    message === 'healing' ) genreID.push(16);

	if (message === 'happy' || 
	    message === 'funny' || 
	    message === 'anxious') genreID.push(35);

	if (message === 'horrible' || 
	    message === 'scary') genreID.push(80);

	if (message === 'boring' || 
	    message === 'scary') genreID.push(99);

	if (message === 'happy' || 
	    message === 'healing' || 
	    message === 'warm') genreID.push(10751);

	if (message === 'fantastic' || 
	    message === 'dreamy' || 
	    message === 'fictional' ||
	    message === 'unreal') genreID.push(14);

	if (message === 'boring' || 
	    message === 'historic') genreID.push(36);

	if (message === 'horrible' || 
	    message === 'scary') genreID.push(27);

	if (message === 'romantic' || 
	    message === 'in love' || 
	    message === 'sweet') genreID.push(10749);

	if (message === 'fictional' || 
	    message === 'unreal' || 
	    message === 'excited' ||
	    message === 'exciting')  genreID.push(878);

	if (message === 'thrilling' || 
	    message === 'scary' || 
	    message === 'excited' ||
	    message === 'exciting') genreID.push(53);

	if (message === 'excited' || 
	    message === 'exciting' || 
	    message === 'angry') genreID.push(10752);

	if (genreID.length == 0) return -1;

	for (var i = 0; i < genreID.length - 1; ++i) {
		param += genreID[i] + '%2C';
	}
	param += genreID[genreID.length-1] + '&page=' + page;
	return param;
}