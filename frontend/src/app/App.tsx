// import { useState } from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../features/authentication/authenticationSlice";
import { AppDispatch } from "./store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProfile());
    }, [dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
