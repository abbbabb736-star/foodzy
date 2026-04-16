import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { CatalogPage } from "../pages/CatalogPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { WishlistPage } from "../pages/WishlistPage";
import { AccountPage } from "../pages/AccountPage";
import { BlogPage } from "../pages/BlogPage";
import { AboutPage } from "../pages/AboutPage";
import { FaqPage } from "../pages/FaqPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "product/:productId", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "account", element: <AccountPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "faq", element: <FaqPage /> },
    ],
  },
]);
