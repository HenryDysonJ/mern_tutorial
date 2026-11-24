import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import TodoForm from '../components/todoForm';
import TodoGrid from '../components/todoGrid';

function Dashboard() {

  const navigate = useNavigate()
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if ( user && !user?.token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="containers">

      <div className="card-panel">
        <TodoForm/>
      </div>

      <div className="card-panel">
        <TodoGrid/>
      </div>

    </div>
  );
}

export default Dashboard;
