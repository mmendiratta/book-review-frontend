import { useBookSelectionContext } from '../BookSelectionContext';
import { HeroShimmer } from './Shimmer';
import './HeroSection.css';

export const HeroSection = ({ review, loading, hidden }) => {
  const { setSelectedBookReview } = useBookSelectionContext();

  if (loading) {
    return <HeroShimmer />;
  }

  if (!review) return null;

  const excerpt =
    review.review?.length > 200
      ? review.review.slice(0, 200).trimEnd() + '...'
      : review.review;

  return (
    <>
      <section className={`hero${hidden ? ' hero--hidden' : ''}`}>
        <div className="hero-inner">
          <div className="hero-left">
            <p className="hero-label">The Current Obsession</p>
            <p className="hero-subtitle">Currently obsessed with...</p>
            <h1 className="hero-title">{review.title}</h1>
            <p className="hero-author">{review.author}</p>
            <p className="hero-excerpt">{excerpt}</p>
            <button
              className="hero-cta"
              onClick={() => setSelectedBookReview({ review })}
            >
              Read Full Review &rarr;
            </button>
          </div>

          <div className="hero-right">
            <div
              className="hero-book-wrapper"
              onClick={() => setSelectedBookReview({ review })}
            >
              <img
                src={review.url}
                alt={review.title}
                className="hero-book-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <span className="divider-flank">◆</span>
        <span className="divider-center">❦</span>
        <span className="divider-flank">◆</span>
      </div>
    </>
  );
};
