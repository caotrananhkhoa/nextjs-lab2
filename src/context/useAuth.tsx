import { useContext } from "react";
import AuthContext from "./authContext";

function useAuth() {
    const data = useContext(AuthContext)
    return data
}

export default useAuth