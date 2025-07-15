import React from 'react';
import { Link } from 'react-router-dom';

function Logo({ width = '120px' }) {
  return (
    <Link to="/" className="inline-block">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" // Replace this with your own logo URL or local path
        alt="App Logo"
        style={{ width }}
        className="object-contain"
      />
    </Link>
  );
}

export default Logo;
