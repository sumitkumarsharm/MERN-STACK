import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './Pages/Home'
import Explore from './Pages/Explore'
import YourLibrary from './Pages/YourLibrary'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/library' element={<YourLibrary />} />
      </Route>
    </Routes>
  )
}

export default App