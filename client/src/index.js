import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";

import "./index.css";
import { App } from "./App";
import { client } from "apolloConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
