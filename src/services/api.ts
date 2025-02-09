import { ApiResponse, Character } from '../interfaces/types';

const API_URL = 'https://rickandmortyapi.com/api';

interface FetchCharactersResult {
  characters: Character[];
  totalPages: number;
}
export const fetchCharacters = async (
  searchTerm: string = '',
  page: number = 1
): Promise<FetchCharactersResult> => {
  const url = searchTerm
    ? `${API_URL}/character/?name=${searchTerm}&page=${page}`
    : `${API_URL}/character?page=${page}`;

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      return { characters: [], totalPages: 0 };
    }
    throw new Error('Network response was not ok');
  }
  const data: ApiResponse = await response.json();
  return { characters: data.results, totalPages: data.info.pages };
};

export const fetchCharacterDetails = async (id: number): Promise<Character> => {
  const response = await fetch(`${API_URL}/character/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch character details');
  }
  const data: Character = await response.json();
  return data;
};
