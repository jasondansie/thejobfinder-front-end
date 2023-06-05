import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './pages/Layout';
import Jobs from './components/Jobs';

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/jobList" element={<Jobs />} />
            <Route path="/resume" element={<Home />} />
            <Route path="/interviewTips" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
