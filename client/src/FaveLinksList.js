import React from 'react';

function FaveLinksList({ links }) {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default FaveLinksList;
