import React from 'react'
import { useParams } from 'react-router-dom'
const User = () => {
    const { id } = useParams();
    return (
        <div className='w-full flex justify-center items-center h-80 border rounded-md bg-gray-600 text-white text-2xl font-bold'>User : {id}</div>
    )
}

export default User