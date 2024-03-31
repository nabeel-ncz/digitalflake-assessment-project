import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Products from "./pages/Products";
import Categories from "./pages/categories/Categories";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import { getUserAction } from "./store/actions/user";
import ListCategories from "./pages/categories/ListCategories";
import CreateCategory from "./pages/categories/CreateCategory";
import UpdateCategory from "./pages/categories/UpdateCategory";
import AppLoader from "./components/ui/AppLoader";

export default function App() {

  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.user);
  const { theme } = useAppSelector((state) => state.common);

  useEffect(() => {
    if (!data) {
      dispatch(getUserAction());
    }
  }, []);

  return (
    <>
      <Toaster />
      <div data-theme={theme === "default" ? "dark" : theme}>
        {loading ? (
          <AppLoader />
        ) : (
          <Routes>
            <Route path="/register" element={data ? <Navigate to={"/"} /> : <Signup />} />
            <Route path="/login" element={data ? <Navigate to={"/"} /> : <Login />} />
            <Route path="/forgot-password" element={data ? <Navigate to={"/"} /> : <ForgotPassword />} />
            <Route path="/" element={data ? <Layout /> : <Navigate to={"/login?message=true"} />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} >
                <Route index element={<ListCategories />} />
                <Route path="create" element={<CreateCategory />} />
                <Route path="update/:id" element={<UpdateCategory />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
    </>
  )
}
