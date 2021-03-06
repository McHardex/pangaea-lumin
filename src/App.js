/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import GET_PRODUCTS from "graphql/queries/products";
import GET_CURRENCIES from "graphql/queries/currencies";
import { useLazyQuery } from "@apollo/client";
import { CartContext } from "contextAPI/CartContext";

import Product from "pages/Product";
import Cart from "components/Cart";

import Loader from "components/Loader";

import "./App.css";

const App = () => {
  const [
    getProducts,
    { loading: loadingProducts, data: product, error: productsError },
  ] = useLazyQuery(GET_PRODUCTS);
  const [getCurrencies, { data: currencyData }] = useLazyQuery(GET_CURRENCIES);

  const { addCurrenciesToCartContext } = useContext(CartContext);

  useEffect(() => {
    getProducts({ variables: { currency: "USD" } });
    getCurrencies();
  }, []);

  useEffect(() => {
    if (typeof currencyData !== "undefined" && currencyData.currency) {
      addCurrenciesToCartContext(currencyData.currency);
    }
  }, [currencyData]);

  if (loadingProducts)
    return (
      <Loader
        loading={loadingProducts}
        size={30}
        loaderMessage="Keep calm! Loading all products."
      />
    );

  if (productsError)
    return (
      <h1 style={{ textAlign: "center" }}>
        Unable to load products, please refresh!!!
      </h1>
    );

  return (
    <div className="App">
      <Cart />
      <Product products={typeof product !== "undefined" && product.products} />
    </div>
  );
};

export default App;
