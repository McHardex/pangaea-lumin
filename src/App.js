/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import GET_PRODUCTS from "graphql/queries/products";
import GET_CURRENCIES from "graphql/queries/currencies";
import { useLazyQuery } from "@apollo/client";

import Product from "pages/Product";
import Cart from "components/Cart";

import "./App.css";

const App = () => {
  const [
    getProducts,
    { loading: loadingProducts, data: product },
  ] = useLazyQuery(GET_PRODUCTS);
  const [
    getCurrencies,
    { loading: loadingCurrencies, data: currency },
  ] = useLazyQuery(GET_CURRENCIES);

  useEffect(() => {
    getProducts({ variables: { currency: "USD" } });
    getCurrencies();
  }, []);

  // console.log(loadingProducts, "loadingProducts");
  // console.log(loadingCurrencies, "loadingCurrencies");
  // console.log(currency, "currency");

  if (loadingProducts) return <h1>Loading products</h1>;

  return (
    <div className="App">
      <Cart />
      <Product products={typeof product !== "undefined" && product.products} />
    </div>
  );
};

export default App;
