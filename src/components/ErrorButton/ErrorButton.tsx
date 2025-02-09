import { useState, FC } from 'react';

const ErrorButton: FC = () => {
  const [throwError, setThrowError] = useState<boolean>(false);

  const handleClick = (): void => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Test Error');
  }

  return (
    <button className="error-button-center" onClick={handleClick}>
      Throw Error
    </button>
  );
};

export default ErrorButton;
