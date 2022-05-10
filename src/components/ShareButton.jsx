import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import { GrShareOption } from 'react-icons/gr';
import { GiShare } from 'react-icons/gi';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ URL, dataId }) {
  const [isCopy, setIsCopy] = useState(false);
  const [isMessageShow, setIsMessageShow] = useState(false);

  const handleClick = () => {
    copy(`http://localhost:3000${URL}`);
    setIsCopy(true);
    setIsMessageShow(true);
    setTimeout(() => setIsMessageShow(false), '2000');
  };

  return (
    <>
      <Button
        data-testid={ dataId }
        onClick={ handleClick }
        aria-controls="link"
        aria-expanded={ isCopy }
        src={ shareIcon }
        variant="outline-dark"
      >
        { isCopy
          ? <GiShare size={ 40 } />
          : <GrShareOption size={ 40 } /> }
      </Button>
      <Collapse in={ isMessageShow }>
        <div id="link">
          Link copied!
        </div>
      </Collapse>
    </>
  );
}

ShareButton.propTypes = {
  dataId: PropTypes.string.isRequired,
  URL: PropTypes.string.isRequired,
};

export default ShareButton;
