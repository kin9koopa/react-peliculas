const API_KEY = '8394baa64abbd91ac68f379166ca4022';

const request = {
	requestMoviesPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
	requestMoviesTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
	requestMoviesTrending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
	requestMoviesHorror: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=horror&page=1&include_adult=false`,
	requestMoviesUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,

	requestTvPopular: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
	requestTvTopRated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
	requestTvTrending: `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`,
	requestTvHorror: `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=horror&page=1&include_adult=false`,
	requestTvAiringToday: `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
};
export default request;
