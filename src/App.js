import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { GlobalStyles } from "./components/GlobalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./containers/Home";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <CssBaseline />
      <GlobalStyles />
      <Home />
    </QueryClientProvider>
  );
}

export default React.memo(App);
