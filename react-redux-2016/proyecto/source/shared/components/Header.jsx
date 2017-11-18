import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'

import styles from './Header.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <FormattedMessage id="title" />
      </h1>
      <nav>
        <Link to="/">
          <FormattedMessage id="header.nav.home" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
