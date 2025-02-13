import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../components/controller/AuthController";

const PrivateRoute = () => {
  const { user } = useAuth(); // Get the authentication status

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
