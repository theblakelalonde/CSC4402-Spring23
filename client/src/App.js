import Login from "./pages/login/Login"
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

function App() {

const { currentUser } = true;
//useContext(AuthContext)

const Layout = () => {
  return(
    <div>
      <Navbar />
      <div style={{display: "flex"}}>
      <LeftBar/>
      <Outlet/>
      <RightBar/>
        
      </div>
    </div>
  )
}


const ProtectedRoute = ({children}) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
}

  const router = createBrowserRouter([
    {
      path: "/",
      element: (       
      <ProtectedRoute>
      <Layout />
    </ProtectedRoute>),
      children: [
        {
          path: "/",
          element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
    }
    ]
    },
    {
      path: "/login",
      element: <Login />,
    }, 
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
