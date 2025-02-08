import { useState } from 'react';

const useLocalStorageSearchTerm = (
  key: string,
  initialValue: string
): [string, (newValue: string) => void, () => void] => {
  const [value, setValue] = useState<string>(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? savedValue : initialValue;
  });

  const handleSearchTermChange = (newValue: string): void => {
    setValue(newValue);
  };

  const handleSearch = (): void => {
    if (value.trim() === '') {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  };

  return [value, handleSearchTermChange, handleSearch];
};

export default useLocalStorageSearchTerm;
