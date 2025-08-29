import React from 'react'
import { Router, Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import AboutTeam from './components/Team'
import AboutTeamMember from './components/AboutOurCompany'
import Github from './components/Github'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="/about/team" element={<AboutTeam />} />
          <Route path="/about/company" element={<AboutTeamMember />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/github" element={<Github />} />
      </Route>
    </Routes>
  )
}

export default App