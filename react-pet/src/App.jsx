// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PetDetailPage from './pages/PetDetailPage';

const App = () => {
  return (
    <Router>
      <h1>404PetNotFound</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pet/:id" element={<PetDetailPage />} /> 
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
