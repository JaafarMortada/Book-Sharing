import './App.css';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="home" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
