import React from 'react';

const Modal = ({ closeModal }) => {
	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseBtn">
					<button onClick={() => closeModal(false)}>X</button>
				</div>
				<div className="title">
					<h1>Leave A review for </h1>
				</div>
				<div className="body">
					<form className="w-full flex flex-col py-4">
						<input
							className="p-3 my-2 bg-gray-500 rounded"
							type="text"
							placeholder="Review Title"
						/>
						<input
							className="p-3 my-2 bg-gray-500 rounded"
							type="text"
							placeholder="enter your review"
						/>
					</form>
				</div>
				<div className="footer">
					<button onClick={() => closeModal(false)}>Submit</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
