import { useSelector } from "react-redux";

const useAuth = () => {
    const currentUser = useSelector((state) => state.users.currentUser);
    return currentUser ? true : false;
};

export default useAuth;
