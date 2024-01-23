import { useNavigate } from 'react-router-dom'

const UnauthorizedComponent = () => {
  const navigate = useNavigate()  
  const Back = () => {
      navigate('/');
  }
  return  (
    <div> 
      <h1>You Are Not Authorized</h1>
      <div> <button onClick={ ()=>Back( ) } className='btn btn-primary'> Back </button> </div>
    </div>
    
    )
};

export default UnauthorizedComponent;