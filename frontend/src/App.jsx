import React from "react";
import { Route,  Routes } from "react-router-dom";
import Home from "../src/pages/home.jsx"
import Post from "../src/pages/createPost.jsx"
function App() {
  return (
   <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/post" element={<Post/>}/>
   </Routes>
  );
}

export default App;
