import { ApiResponse, Character } from '../interfaces/types';

const API_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (
  searchTerm: string = ''
): Promise<Character[]> => {
  const url = searchTerm
    ? `${API_URL}/character/?name=${searchTerm}&page=1`
    : `${API_URL}/character`;

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    throw new Error('Network response was not ok');
  }
  const data: ApiResponse = await response.json();
  return data.results;
};
