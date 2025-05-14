import React, { useEffect, useState } from 'react';
import AddLinkForm from './AddLinkForm';
import FaveLinksList from './FaveLinksList';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/links`);
      const data = await response.json();
      setLinks(data);
    } catch (err) {
      console.error('Error fetching links:', err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleAddLink = (newLink) => {
    setLinks((prevLinks) => [newLink, ...prevLinks]);
  };

  return (
    <div className="App">
      <h1>FaveLinks</h1>
      <AddLinkForm onAddLink={handleAddLink} />
      <FaveLinksList links={links} />
    </div>
  );
}

export default App;
