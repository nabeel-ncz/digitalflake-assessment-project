import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/user/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Products from "./pages/user/Products";
import Categories from "./pages/user/Categories";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { useAppSelector } from "./hooks";

export default function App() {

  const theme = useAppSelector((state) => state.common.theme);

  return (
    <>
      <div data-theme={theme === "default" ? "dark" : theme}>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}
