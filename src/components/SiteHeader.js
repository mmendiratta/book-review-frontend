import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { GENRES } from '../constants/genres';
import './SiteHeader.css';

export const SiteHeader = ({ activeGenre, setActiveGenre, searchQuery, setSearchQuery }) => {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-top">
          <Link to="/" className="header-logo">Raina Reviews</Link>
          <div className="header-right">
            <div className="search-wrapper">
              <SearchOutlined className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search books..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="header-genres">
          <button
            className={`genre-pill${!activeGenre ? ' active' : ''}`}
            onClick={() => setActiveGenre(null)}
          >
            All
          </button>
          {GENRES.map(genre => (
            <button
              key={genre.value}
              className={`genre-pill${activeGenre === genre.value ? ' active' : ''}`}
              onClick={() => setActiveGenre(activeGenre === genre.value ? null : genre.value)}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
