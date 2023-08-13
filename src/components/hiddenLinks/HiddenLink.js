import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';

const ShowLogin = ({children}) => {
    const isLogged = useSelector(selectIsLoggedIn)

    if(isLogged){
        return children
    }
    return null;

 
};
export const ShowLogout = ({children}) => {
    const isLogged = useSelector(selectIsLoggedIn)

    if(!isLogged){
        return children
    }
    return null;

 
};

export default ShowLogin;