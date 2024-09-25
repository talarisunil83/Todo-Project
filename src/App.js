import {Component} from 'react'
import {Route, Routes} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import TaskDashborad from './components/TaskDashborad' // Ensure correct spelling here

import './App.css'

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/" element={<TaskDashborad />} />{' '}
        {/* Fixed spelling here */}
      </Routes>
    )
  }
}

export default App
