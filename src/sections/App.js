import React from 'react';
import { Layout } from 'antd';
import { Bio } from './bio/Bio';
import { Books } from './books/Books';
import { BookSelectionProvider } from '../BookSelectionContext';
import { SelectedReviewSection } from './selectedReview/SelectedReviewSection';

const App = () => {
  return (
    
      <Layout hasSider>
        <BookSelectionProvider>
          <Bio />
          <Books />
          <SelectedReviewSection />
        </BookSelectionProvider>
      </Layout >
    
  );
};
export default App;