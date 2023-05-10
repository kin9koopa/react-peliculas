import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

const SavedContent = () => {
	const [movies, setMovies] = useState([]);
	const { user } = useAuth();

	const slideLeft = () => {
		var slider = document.getElementById('slider');
		slider.scrollLeft -= 500;
	};

	const slideRight = () => {
		var slider = document.getElementById('slider');
		slider.scrollLeft += 500;
	};

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
				<MdChevronLeft
					onClick={slideLeft}
					className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
					size={40}
				/>
				<div
					id={'slider'}
					className="w-full left-0 h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
				>
					{movies.map((item, id) => (
						<>
							<div
								key={id}
								className="w-[160px] sm:2-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
							>
								<img
									className="w-full h-auto block max-h-[146px]"
									src={`https://image.tmdb.org/t/p/w500/${
										item?.backdrop_path
											? item?.backdrop_path
											: item?.poster_path
									}`}
									alt={item?.title}
								/>
								<div className="absolute top-0 left-0 w-full h-full hover:bg-black/60 opacity-0 hover:opacity-100 text-white">
									<p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
										{item?.title ? item?.title : item?.name}
									</p>
									<p
										onClick={() => deleteFavorite(item.id)}
										className="absolute text-gray-300 top-4 right-4"
									>
										<AiOutlineClose />
									</p>
								</div>
								<div className="flex justify-center items-center h-full">
									<h1>Reviews!</h1>
								</div>
							</div>
						</>
					))}
				</div>
				<MdChevronRight
					onClick={slideRight}
					className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
					size={40}
				/>
			</div>
		</>
	);
};

export default SavedContent;
