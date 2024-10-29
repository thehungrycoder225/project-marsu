import { Link, useNavigate, useLocation } from 'react-router-dom';
import './404.css';
import logo from '../assets/logo.png';

function PageNotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location.state?.from?.pathname || '/';

  return (
    <div className='page404_container'>
      <img src={logo} alt='' className='page404_logo' />
      <div className='page404_content'>
        <h1>{'404 Page Not Found :('}</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
      <div className='page404_btn_group'>
        <button
          className='page404_btn page404_btn--back'
          onClick={() => navigate(-1)}
        >
          Go back to the previous page
        </button>

        <Link to='/' className='page404_btn page404_btn--home'>
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
