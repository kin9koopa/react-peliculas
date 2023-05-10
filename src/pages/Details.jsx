import axios from 'axios';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

const Details = () => {
	const { user } = useAuth();
	const [saved, setSaved] = useState(false);
	const [review, setReview] = useState('');
	const [rating, setRating] = useState(0);

	const movieID = doc(db, 'users', `${user?.email}`);

	const { id } = useParams();
	const [movie, setMovie] = React.useState([]);

	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${id}?api_key=8394baa64abbd91ac68f379166ca4022&language=en-US`
			)
			.then((response) => {
				setMovie(response.data);
			});
	}, [id]);

	console.log(movie);

	// save review

	const saveReview = async () => {
		if (user?.email) {
			setSaved(true);
			const movieRef = doc(db, 'reviews', `${movie.id}`);
			await updateDoc(movieRef, {
				savedReviews: arrayUnion({
					title: movie?.title || movie?.name,
					img: movie.backdrop_path,
					review: review,
					rating: rating,
					user: user.email,
				}),
			});
		} else {
			alert('Please login to save reviews');
		}
	};

	return (
		<div className="items-center flex justify-center">
			<div className="items-center flex justify-center flex-col">
				<h1
					className={
						'text-white text-4xl font-bold items-center flex justify-center mt-20'
					}
				>
					{movie.title}
				</h1>
				<p className={'text-white items-center flex justify-center'}>
					Release: {movie.release_date}
				</p>
				<img
					alt={movie.title}
					src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
				/>
			</div>
			<div>
				<h1 className={'text-white items-center flex justify-center'}>
					Review
				</h1>
				<form className={'items-center flex justify-center flex-col'}>
					<h2 className={'text-white items-center flex justify-center'}>
						Leave a Review
					</h2>
					<input
						onChange={(e) => setRating(e.target.value)}
						type="number"
						placeholder="Rating 1-5"
					/>
					<textarea
						onChange={(e) => setReview(e.target.value)}
						type="text"
						placeholder="Review"
					/>
					<button
						className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white ml-4"
						type="submit"
						onClick={saveReview}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Details;
