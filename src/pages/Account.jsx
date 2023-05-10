import React from 'react';
import SavedContent from '../components/SavedContent';

const AccountPage = () => {
	return (
		<>
			<div className="w-full text-white">
				<img
					className="w-full h-[400px] object-cover"
					src="https://fandomwire.com/wp-content/uploads/2018/08/Movies-background.png"
					alt="account"
				/>
				<div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]">
					<div className="absolute top-[20%] p-4 md:p-8">
						<h1 className="text-3xl md:text-5xl font-bold">
							Favorite Shows and Movies
						</h1>
					</div>
				</div>
				<SavedContent />
			</div>
		</>
	);
};

export default AccountPage;
