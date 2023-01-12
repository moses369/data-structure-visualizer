import React from "react";
import Options from "../../components/Options/Options";
import Display from "../../components/Display/Display";
import s from "./Main.module.scss";
import LinkedListContextProvider from "../../context/LinkedListContext";
const Main = () => {
  return (
    <main className={`${s.container}`}>
      <LinkedListContextProvider>
        <Options />
        <Display />
      </LinkedListContextProvider>
    </main>
  );
};

export default Main;
