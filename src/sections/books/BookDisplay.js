import { Rate } from 'antd';
import { useBookSelectionContext } from '../../BookSelectionContext';
import './BookDisplay.css';

export const BookDisplay = ({ review }) => {
  const { setSelectedBookReview } = useBookSelectionContext();

  return (
    <div className="book-card" onClick={() => setSelectedBookReview({ review })}>
      <div className="book-cover-wrapper">
        <img
          src={review.url}
          alt={review.title}
          className="book-cover-3d"
        />
      </div>
      <div className="book-card-info">
        <h3 className="book-card-title">{review.title}</h3>
        <p className="book-card-author">{review.author}</p>
        <Rate
          disabled
          defaultValue={review.rating}
          className="book-card-stars"
          style={{ fontSize: 13, color: 'var(--gold)' }}
        />
      </div>
    </div>
  );
};
