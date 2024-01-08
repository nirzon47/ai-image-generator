const SearchBar = () => {
	return (
		<div className='flex gap-4'>
			<input
				type='text'
				name='search'
				id='search'
				className='input input-bordered'
			/>
			<button type='submit' className='btn btn-primary'>
				Generate!
			</button>
		</div>
	)
}

export default SearchBar
