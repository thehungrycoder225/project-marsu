import { Link, useNavigate, useLocation } from 'react-router-dom';
import back from '../assets/icons/chevron-left.png';
import home from '../assets/icons/home_4.png';
import './navBack.css';

function NavBack() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPage = location.state?.from?.pathname || '/';

  return (
    <div>
      <div className='btn_group'>
        <Link className='btn btn--back' onClick={() => navigate(-1)}>
          <img src={back} alt='' />
        </Link>

        <Link to='/sdg' className='btn btn--home'>
          <img src={home} alt='' />
        </Link>
      </div>
    </div>
  );
}

export default NavBack;
