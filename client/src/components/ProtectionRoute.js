import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children })=> {
  if (!localStorage.access_token) {
    Swal.fire({
      title: 'Oops!',
      text: 'You must login firts',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    return <Navigate to={'/login/user'} />
  }
  return children
}

export default ProtectedRoute