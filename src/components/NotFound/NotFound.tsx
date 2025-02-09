import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => (
  <div className="not-found">
    <div className="not-found-box">
      <h1>404 - Page Not Found!</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  </div>
);

export default NotFound;
