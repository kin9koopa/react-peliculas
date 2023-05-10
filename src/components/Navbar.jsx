import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import request from '../Request';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
	const { user, logOut } = useAuth();
	const navigate = useNavigate();
	console.log(user?.email);

	const [movies, setMovies] = useState([]);

	const handleLogout = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};

	const [searchKey, setSearchKey] = useState('');

	const fetchMovies = async (searchKey) => {
		axios.get(request.requestMovieSearch).then((response) => {
			setMovies(response.data.results);
		});
	};

	useEffect(() => {
		fetchMovies();
	}, []);
	const searchMovies = (e) => {
		e.preventDefault();
		fetchMovies(searchKey);
	};

	return (
		<div className="flex items-center justify-between p-4 z-[100] absolute w-full">
			<Link to="/">
				<h1 className="text-red-600 text-4xl font-bold cursor-pointer">
					TheMovieDB
				</h1>
			</Link>
			{user?.email ? (
				<div className="flex items-center" onClick={searchMovies}>
					<form className="mr-10">
						<input
							onChange={(e) => setSearchKey(e.target.value)}
							className="p-2 rounded"
							type="text"
							placeholder="Search"
						/>
						<button
							className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white ml-4"
							type="submit"
						>
							Search
						</button>
					</form>
					<Link to="/account">
						<button className="text-white pr-4">Account</button>
					</Link>
					<button
						onClick={handleLogout}
						className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
					>
						Sign Out
					</button>
				</div>
			) : (
				<div>
					<Link to="/login">
						<button className="text-white pr-4">Sign In</button>
					</Link>
					<Link to="/signup">
						<button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
							Sign Up
						</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Navbar;
