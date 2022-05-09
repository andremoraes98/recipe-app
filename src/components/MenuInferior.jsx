import React from 'react';
import { Link } from 'react-router-dom';
import { BiDrink } from 'react-icons/bi';
import { GiCompass } from 'react-icons/gi';
import { MdOutlineFoodBank } from 'react-icons/md';

const MenuInferior = () => (
  <footer className="footer-container" data-testid="footer">
    <div className="footer">
      <Link to="/drinks">
        <BiDrink
          size={ 40 }
          color="#444"
        />
      </Link>
      <Link to="/explore">
        <GiCompass
          size={ 40 }
          color="#444"
        />
      </Link>
      <Link to="/foods">
        <MdOutlineFoodBank
          size={ 40 }
          color="#444"
        />
      </Link>
    </div>
  </footer>
);

export default MenuInferior;
