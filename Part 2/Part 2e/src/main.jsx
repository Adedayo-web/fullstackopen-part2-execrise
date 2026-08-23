import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import PhoneBook from "./exercise 2.16 - 2.17/PhoneBook.jsx";
import Currency from "./currency.jsx";
import Countries from "./exercise 2.18 - 2.20/countries.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <PhoneBook /> */}
    {/* <Currency /> */}
    <Countries />
  </StrictMode>,
);
