import './Shimmer.css';

export const CardShimmer = () => (
  <div className="card-shimmer">
    <div className="card-shimmer-cover shimmer" />
    <div className="card-shimmer-title shimmer" />
    <div className="card-shimmer-author shimmer" />
    <div className="card-shimmer-stars shimmer" />
  </div>
);

export const GridShimmer = ({ count = 8 }) => (
  <div className="grid-shimmer">
    {Array.from({ length: count }).map((_, i) => (
      <CardShimmer key={i} />
    ))}
  </div>
);

export const HeroShimmer = () => (
  <div className="hero-shimmer">
    <div className="hero-shimmer-left">
      <div className="hero-shimmer-label shimmer" />
      <div className="hero-shimmer-title shimmer" />
      <div className="hero-shimmer-author shimmer" />
      <div className="hero-shimmer-text shimmer" />
      <div className="hero-shimmer-text shimmer" style={{ width: '75%' }} />
      <div className="hero-shimmer-text shimmer" style={{ width: '60%' }} />
      <div className="hero-shimmer-btn shimmer" />
    </div>
    <div className="hero-shimmer-right">
      <div className="hero-shimmer-cover shimmer" />
    </div>
  </div>
);
