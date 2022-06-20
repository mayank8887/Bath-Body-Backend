import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'
import {Provider} from "react-redux";
import {store} from "./Redux/store"

axios.defaults.baseURL = "http://localhost:8080"
axios.defaults.headers.post["Content-Type"] = "application/json"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <ChakraProvider>
      <Provider store={store}>
       <App />
    </Provider>
     </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
