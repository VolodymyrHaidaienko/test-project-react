import React, { FC } from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "./Store/Layout";
import Users from "./constants/users/Users";

import './App.css';

const App: FC = ()=> {
  return (
    <div className="App">
           <Routes>
        <Route path={'/'} element={<Layout />}>
           <Route path={'/'} element={<Users/>}/>
                </Route>
            </Routes>
    </div>
  );
}

export default App;
