import { BookDisplay } from './BookDisplay';
import { CreateReview } from './CreateReview';
import { GridShimmer } from '../../components/Shimmer';
import { getAccountRoles } from '../../services/accountsApi';
import './Books.css';

export const Books = ({ reviews, loading, refreshReviews }) => {
  const userRoles = getAccountRoles();

  if (loading) {
    return <GridShimmer count={8} />;
  }

  return (
    <section className="books-section">
      <div className="books-section-header">
        {userRoles && userRoles.includes('admin-role') && (
          <CreateReview refreshReviews={refreshReviews} />
        )}
        {!loading && (
          <span className="books-section-count">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </span>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="books-empty">
          No reviews found.
        </div>
      ) : (
        <div className="books-grid">
          {reviews.map(review => (
            <BookDisplay key={review._id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
};
