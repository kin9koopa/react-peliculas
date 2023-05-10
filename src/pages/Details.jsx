import axios from 'axios';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

const Details = () => {
	const { user } = useAuth();
	const [saved, setSaved] = useState(false);
	const [review, setReview] = useState('');
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);

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

	const saveFavorites = async () => {
		if (user?.email) {
			setSaved(true);
			await updateDoc(movieID, {
				savedFavorites: arrayUnion(movie),
				id: movie.id,
				title: movie?.title | movie?.name,
				img: movie.backdrop_path,
				rating: rating,
				review: review,
			});
		} else {
			alert('Please login to save movies/shows');
		}
	};

	const Star = ({ yellow }) => {
		return (
			<AiFillStar className={yellow ? 'text-yellow-500' : 'text-gray-200'} />
		);
	};

	return (
		<div className="items-center flex justify-center ">
			<div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-[5%] mb-20">
				<div className="items-center flex justify-center flex-col">
					<h1
						className={
							'text-white text-4xl font-bold items-center flex justify-center'
						}
					>
						{movie.title}
					</h1>
					<p className={'text-white items-center flex justify-center'}>
						Release: {movie.release_date}
					</p>
					<img
						className={
							'items-center flex justify-center rounded-lg my-4 h-[50%] w-[50%]'
						}
						alt={movie.title}
						src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
					/>
				</div>
				<div>
					<div
						className={'text-white items-center flex justify-center flex-col'}
					>
						Movie Rating
						<ul className="text-white flex justify-center">
							{[1, 2, 3, 4, 5].map((star) => {
								return (
									<li
										onMouseEnter={() => setHover(star)}
										key={star}
										onMouseLeave={() => setHover(0)}
										onClick={() => setRating(star)}
									>
										<Star key={star} yellow={star <= hover || star <= rating} />
									</li>
								);
							})}
						</ul>
					</div>
					<form className={'items-center flex justify-center flex-col'}>
						<h2 className={'text-white items-center flex justify-center'}>
							Leave a Review
						</h2>

						<textarea
							onChange={(e) => setReview(e.target.value)}
							type="text"
							placeholder="Review"
						/>
						<button
							className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white ml-4"
							type="submit"
							onClick={saveFavorites}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Details;
