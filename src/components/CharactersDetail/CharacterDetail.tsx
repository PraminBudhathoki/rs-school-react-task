import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Character } from '../../interfaces/types';
import { fetchCharacterDetails } from '../../services/api';

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) {
        setError('Character ID is missing');
        setLoading(false);
        return;
      }

      console.log(`Fetching details for character ID: ${id}`);
      try {
        const data = await fetchCharacterDetails(parseInt(id, 10));
        setCharacter(data);
        console.log('Character details fetched:', data);
      } catch (err) {
        console.error('Failed to load character details', err);
        setError('Failed to load character details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="character-details">
      <button onClick={handleClose}>Close</button>
      {character && (
        <>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Type:</strong> {character.type}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin.name}
          </p>
          <p>
            <strong>Location:</strong> {character.location.name}
          </p>
          <p>
            <strong>Episodes:</strong>
          </p>
          <ul>
            {character.episode.map((ep, index) => (
              <li key={index}>{ep.split('/').pop()}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CharacterDetail;
