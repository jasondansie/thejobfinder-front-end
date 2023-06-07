import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './pages/Layout';
import Jobs from './components/Jobs';
import Resume from './components/Resume';
import InterviewTips from './components/InterviewTips';
import AddJob from './components/AddJob';
import ViewJob from './components/ViewJob';
import PersonlLinks from './components/PersonlLinks';

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jobList" element={<Jobs />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/interviewTips" element={<InterviewTips />} />
          <Route path="/addjob" element={<AddJob />} />
          <Route path="/viewjob/:id" element={<ViewJob />} />
          <Route path="/personallinks" element={<PersonlLinks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
