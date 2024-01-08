import axios from 'axios'
import { useState } from 'react'

/**
 * A function to retrieve a picture.
 *
 * @return {Promise<void>} This function does not take any parameters.
 */
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

	/**
	 * A function to retrieve a picture.
	 *
	 * @return {Promise<void>} This function does not take any parameters.
	 */
	const getPicture = async () => {
		setLoading(true)

		try {
			// Passing body as a x-www-form-urlencoded string
			let params = new URLSearchParams()
			params.append('inputs', query)
			let data = params.toString()

			// Making axios request config
			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
				headers: {
					Authorization: process.env.REACT_APP_API_KEY,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				data: data,
				// API sends us the image as is so we need to make sure our response is a blob
				responseType: 'blob',
			}

			// Making axios request
			const response = await axios.request(config)
			// Converting blob to URL
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
			<form className='flex gap-4 justify-center items-center flex-wrap'>
				<input
					type='text'
					name='search'
					id='search'
					className='input input-bordered w-11/12 md:w-64'
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
