import { Layout } from 'antd';
import { isMobile } from 'react-device-detect';
import { Bio } from './bio/Bio';
import { Books } from './books/Books';
import { BookSelectionProvider } from '../BookSelectionContext';
import { SelectedReviewSection } from './selectedReview/SelectedReviewSection';
import { SelectedReviewSectionMobile } from './selectedReview/SelectedReviewSectionMobile';
import { Routes, Route } from 'react-router-dom';
import { Login } from '../login/Login';

const HomePage = () => {
  return (
    <Layout hasSider={!isMobile}>
      <BookSelectionProvider>
        <Bio />
        <Books />
        {isMobile ? <SelectedReviewSectionMobile /> : <SelectedReviewSection /> }
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
        <Route key="home" path="/" exact element={<HomePage />} />
        <Route key="login" path="/login" element={<LoginPage />} />
      </Routes>
  );
};
export default App;