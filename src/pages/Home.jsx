import request from '../Request';
import Main from '../components/Main';
import Row from '../components/Row';

const Home = () => {
	return (
		<div>
			<Main />
			<Row
				rowID="1"
				title="Popular Movies"
				fetchUrl={request.requestMoviesPopular}
			/>
			<Row
				rowID="2"
				title="Poplular TV Shows"
				fetchUrl={request.requestTvPopular}
			/>
			<Row
				rowID="3"
				title="Top Rated Movies"
				fetchUrl={request.requestMoviesTopRated}
			/>
			<Row
				rowID="4"
				title="Top Rated TV Shows"
				fetchUrl={request.requestTvTopRated}
			/>
		</div>
	);
};

export default Home;
