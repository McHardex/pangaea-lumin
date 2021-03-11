/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import GET_PRODUCTS from "graphql/queries/products";
import GET_CURRENCIES from "graphql/queries/currencies";
import { useLazyQuery } from "@apollo/client";

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

  console.log(loadingProducts, "loadingProducts");
  console.log(loadingCurrencies, "loadingCurrencies");
  console.log(product, "product");
  console.log(currency, "currency");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
