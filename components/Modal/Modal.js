import React, {useState} from 'react';

export default function Modal({category, setDeletedCategory, deletedCategory, deleteCategory}) {
	const [showModal, setShowModal] = useState(false);

	const handleClickLeftBtn = () => {
		setDeletedCategory(category);
		setShowModal(true);
	};

	const handleClick = () => {
		deleteCategory(deletedCategory);
		setShowModal(false);
	};

	return (
		<>
			<button className='btn-red w-20' type='button' onClick={handleClickLeftBtn}>
        Delete
			</button>
			{showModal ? (
				<div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm'>
					<div className='relative w-auto my-6 mx-auto max-w-3xl border-0 rounded-sm shadow-lg flex flex-col bg-white outline-none focus:outline-none'>
						<p className='text-center text-lg font-semibold p-6'>
              Do you really want to delete?
						</p>

						<div className='flex items-center justify-center p-6 gap-2'>
							<button
								className='btn-primary'
								type='button'
								onClick={() => setShowModal(false)}
							>
                No
							</button>
							<button className='btn-red' type='button' onClick={handleClick}>
                Yes, delete
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
