import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import { getUserAction } from "./store/actions/user";

export default function App() {

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.user);
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
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={data ? <Layout /> : <Navigate to={"/login?message=true"} />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}
