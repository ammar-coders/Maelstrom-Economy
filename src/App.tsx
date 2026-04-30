import { Route, Routes } from 'react-router'

import Home from './page/home'
import News from './page/news'
import Login from './page/login'
import Register from './page/register'
import Accounts from './page/accounts'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </div>
  )
}

export default App
