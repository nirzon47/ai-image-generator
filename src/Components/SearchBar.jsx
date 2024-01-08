import axios from 'axios'
import { useState } from 'react'

const SearchBar = ({ setPicture }) => {
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleSearchChange = (e) => {
		setQuery(e.target.value)
	}

	const handleClickGenerate = (e) => {
		e.preventDefault()

		getPicture()
	}

	const getPicture = async () => {
		setLoading(true)

		try {
			let params = new URLSearchParams()
			params.append('inputs', query)
			let data = params.toString()

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
				headers: {
					Authorization: process.env.REACT_APP_API_KEY,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				data: data,
				responseType: 'blob',
			}

			const response = await axios.request(config)
			const url = URL.createObjectURL(response.data)

			setPicture(url)
			setError(false)
		} catch (error) {
			setError(true)
			setErrorMessage(error.message)
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<form className='flex gap-4 justify-center'>
				<input
					type='text'
					name='search'
					id='search'
					className='input input-bordered'
					value={query}
					onChange={handleSearchChange}
				/>
				<button
					type='submit'
					className='btn btn-primary'
					onClick={handleClickGenerate}
				>
					Generate!
				</button>
			</form>
			<div className='flex justify-center h-12 items-center'>
				{loading && (
					<span className='loading loading-dots loading-lg'></span>
				)}
				{error && (
					<p className='text-red-500 text-xl text-center font-bold py-4'>
						{errorMessage}
					</p>
				)}
			</div>
		</>
	)
}

export default SearchBar
