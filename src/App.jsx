import Header from './Components/Header'
import SearchBar from './Components/SearchBar'

import { useState } from 'react'

const App = () => {
	const [picture, setPicture] = useState('')

	return (
		<div className='grid place-content-center min-h-screen'>
			<Header />
			<SearchBar setPicture={setPicture} />
			<div className='h-[50vh] flex justify-center items-center mt-8'>
				<img src={picture} alt='' className='h-full rounded-md' />
			</div>
		</div>
	)
}

export default App
