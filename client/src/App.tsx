import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/user/Home";
import Products from "./pages/user/Products";
import Categories from "./pages/user/Categories";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </>
  )
}
