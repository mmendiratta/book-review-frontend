import React from 'react';
import { Layout } from 'antd';
import { isMobile } from 'react-device-detect';
import { Bio } from './bio/Bio';
import { Books } from './books/Books';
import { BookSelectionProvider } from '../BookSelectionContext';
import { SelectedReviewSection } from './selectedReview/SelectedReviewSection';
import { Routes, Route } from 'react-router-dom';
import { Login } from '../login/Login';

const HomePage = () => {
  return (
    <Layout hasSider={!isMobile}>
      <BookSelectionProvider>
        <Bio />
        <Books />
        <SelectedReviewSection />
      </BookSelectionProvider>
    </Layout >
  )
}

const LoginPage = () => {
  return <Login />
}

const App = () => {
  return (
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
  );
};
export default App;