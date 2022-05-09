import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import BarraDeBusca from './BarraDeBusca';

const Header = ({ pageTitle, isSearch }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header>
      <div className="header">
        <Link to="/profile">
          <BsFillPersonLinesFill
            size={ 40 }
            color="#444"
          />
        </Link>

        <h4 data-testid="page-title">{pageTitle}</h4>

        {isSearch && (
          <button
            className="btn-search"
            type="button"
            onClick={ () => setShowSearch(!showSearch) }
          >
            <BiSearchAlt
              size={ 40 }
              color="#444"
            />
          </button>
        )}
      </div>

      {showSearch && (
        <BarraDeBusca />
      )}
    </header>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  isSearch: PropTypes.bool.isRequired,
};

export default Header;
