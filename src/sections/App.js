import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Books } from './books/Books';
import { BookSelectionProvider } from '../BookSelectionContext';
import { ReviewOverlay } from './selectedReview/ReviewOverlay';
import { Login } from '../login/Login';
import { SiteHeader } from '../components/SiteHeader';
import { HeroSection } from '../components/HeroSection';
import { getBookBookReviews } from '../services/accountsApi';

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await getBookBookReviews();
      setReviews(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(review => {
    const matchesGenre = !activeGenre || review.genre === activeGenre;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      (review.title || '').toLowerCase().includes(q) ||
      (review.author || '').toLowerCase().includes(q);
    return matchesGenre && matchesSearch;
  });

  const mostRecentReview = reviews.length > 0 ? reviews[reviews.length - 1] : null;

  return (
    <BookSelectionProvider refreshReviews={fetchReviews}>
      <SiteHeader
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <HeroSection
        review={mostRecentReview}
        loading={loading}
        hidden={!!(searchQuery || activeGenre)}
      />
      <Books
        reviews={filteredReviews}
        loading={loading}
        refreshReviews={fetchReviews}
      />
      <ReviewOverlay />
    </BookSelectionProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
