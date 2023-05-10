import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdReviews } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import '../index.css';
import Modal from './Modal';

const Movie = ({ item }) => {
	const [like, setLike] = useState(false);
	const [favorite, setFavorite] = useState(false);
	const { user } = useAuth();

	const movieID = doc(db, 'users', `${user?.email}`);

	const saveFavorites = async () => {
		if (user?.email) {
			setLike(!like);
			setFavorite(true);
			await updateDoc(movieID, {
				savedFavorites: arrayUnion(item),
				id: item.id,
				title: item?.title | item?.name,
				img: item.backdrop_path,
			});
		} else {
			alert('Please login to save movies/shows');
		}
	};

	return (
		<div className="w-[160px] sm:2-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
			<img
				className="w-full h-auto block max-h-[146px]"
				src={`https://image.tmdb.org/t/p/w500/${
					item?.backdrop_path ? item?.backdrop_path : item?.poster_path
				}`}
				alt={item?.title}
			/>
			<div className="absolute top-0 left-0 w-full h-full hover:bg-black/60 opacity-0 hover:opacity-100 text-white">
				<p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
					{item?.title ? item?.title : item?.name}
				</p>
				<p onClick={saveFavorites}>
					{like ? (
						<FaHeart className="absolute top-4 left-4 text-gray-300" />
					) : (
						<FaRegHeart className="absolute top-4 left-4 text-gray-300" />
					)}
				</p>
			</div>
		</div>
	);
};

export default Movie;
