import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { AuthProvider } from "./utils/AuthProvider";
import PengaduanForm from "./pages/PengaduanForm";
import ManajemenPengaduan from "./pages/ManajemenPengaduan";
import ProfileUser from "./pages/ProfileUser";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<BaseLayout />}>
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <ProfileUser />
              </PrivateRoute>
            }
          />
          <Route
            path="pengaduan"
            element={
              <PrivateRoute>
                <PengaduanForm />
              </PrivateRoute>
            }
          />
          <Route
            path="manajemen"
            element={
              <PrivateRoute>
                <ManajemenPengaduan />
              </PrivateRoute>
            }
          />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
