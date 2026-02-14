import { useEffect, useState } from 'react';
import { Rate, Button } from 'antd';
import { CloseOutlined, EditFilled } from '@ant-design/icons';
import { useBookSelectionContext } from '../../BookSelectionContext';
import { getAccountRoles } from '../../services/accountsApi';
import { EditReview } from '../books/EditReview';
import { GENRES } from '../../constants/genres';
import './ReviewOverlay.css';

export const ReviewOverlay = () => {
  const { selectedBookReview, setSelectedBookReview, setEditBook, refreshReviews } =
    useBookSelectionContext();

  const userRoles = getAccountRoles();
  const isAdmin = userRoles && userRoles.includes('admin-role');
  const [closing, setClosing] = useState(false);

  const handleClose = () => setClosing(true);

  const handleAnimationEnd = (e) => {
    // Only fire on the panel itself, not bubbled events from children
    if (e.target !== e.currentTarget) return;
    if (closing) {
      setClosing(false);
      setSelectedBookReview(null);
    }
  };

  useEffect(() => {
    if (!selectedBookReview) return;
    setClosing(false);
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedBookReview]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!selectedBookReview) return null;

  const { review } = selectedBookReview;
  const genreLabel = GENRES.find(g => g.value === review.genre)?.label;

  return (
    <>
      <div className={`review-backdrop${closing ? ' closing' : ''}`} onClick={handleClose} />
      <div
        className={`review-panel${closing ? ' closing' : ''}`}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* Mobile handle bar */}
        <div className="review-panel-handle" />

        <button className="review-panel-close" onClick={handleClose}>
          <CloseOutlined />
        </button>

        {/* Book cover */}
        <div className="review-panel-left">
          <img
            src={review.url}
            alt={review.title}
            className="review-panel-cover"
          />
        </div>

        {/* Review content */}
        <div className="review-panel-right">
          {genreLabel && (
            <span className="review-panel-genre">{genreLabel}</span>
          )}
          <h2 className="review-panel-title">{review.title}</h2>
          <p className="review-panel-author">{review.author}</p>
          <div className="review-panel-meta">
            <Rate
              disabled
              defaultValue={review.rating}
              style={{ fontSize: 14, color: 'var(--gold)' }}
            />
          </div>
          <hr className="review-panel-divider" />
          <p className="review-panel-text">{review.review}</p>
          {isAdmin && (
            <div className="review-panel-actions">
              <Button icon={<EditFilled />} onClick={() => setEditBook(true)}>
                Edit Review
              </Button>
            </div>
          )}
        </div>
      </div>

      <EditReview selectedBook={selectedBookReview} refreshReviews={refreshReviews} />
    </>
  );
};
