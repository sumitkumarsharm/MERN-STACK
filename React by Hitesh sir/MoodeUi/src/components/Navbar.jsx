import React from 'react'

const Navbar = () => {
    return (
        <header className='w-full py-4 bg-neutral-400 text-white '>
            <nav className='flex justify-between items-center'>
                <div className='text-lg font-bold'>Logo</div>
                <ul className='flex space-x-4'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar