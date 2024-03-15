import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals"; 
import { Provider } from "react-redux";
import store from "./app/store";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}> 
        <AuthProvider>
          <App />
        </AuthProvider> 
    </Provider>
  </React.StrictMode>
);
 
reportWebVitals();
