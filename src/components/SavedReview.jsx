import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

const SavedReview = () => {
	const [movies, setMovies] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
			setMovies(doc.data()?.savedFavorites);
		});
	}, [user?.email]);

	const movieRef = doc(db, 'users', `${user?.email}`);

	const deleteFavorite = async (passedID) => {
		try {
			const result = movies.filter((item) => item.id !== passedID);
			await updateDoc(movieRef, {
				savedFavorites: result,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h2 className="text-white font-bold md:text-xl p-4">My Favorites</h2>
			<div className="relative flex items-center group">
				<div className="w-full left-0 h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
					{movies.map((item, id) => (
						<div key={id} className="">
							<img
								className=""
								src={`https://image.tmdb.org/t/p/w500/${
									item?.backdrop_path ? item?.backdrop_path : item?.poster_path
								}`}
								alt={item?.title}
							/>
							<div className="text-white">
								<p className="text-white">
									{item?.title ? item?.title : item?.name}
								</p>
								<p className="text-white">Description: {item?.review}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default SavedReview;
