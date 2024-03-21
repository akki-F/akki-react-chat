import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home';
import ChatForm from './app/chat/ChatForm';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chat' element={<ChatForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
