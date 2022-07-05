import React, { useState } from "react"
import { GlobalStateContext } from "./GlobalStateContext"
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { Form } from "../types/Form";

export const GlobalState = (props: any) => {
  const toaster = (text: string, time: number, type: string) => {
    const obj = {
      error: () => {
        toast.error(`${text}`, {
          position: "bottom-right",
          autoClose: time,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      },
      success: () => {
        toast.success(`${text}`, {
          position: "bottom-right",
          autoClose: time,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      },
      warning: () => {
        toast.warning(`${text}`, {
          position: "bottom-right",
          autoClose: time,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });

        toast.warning("");
      },
      info: () => {
        toast.info(`${text}`, {
          position: "bottom-right",
          autoClose: time,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });

        toast.info("");
      }
    };

    obj[type]();
  };




  const data = {  toaster }
  return (
    <GlobalStateContext.Provider value={data}>
      {props.children}
      <ToastContainer />
    </GlobalStateContext.Provider>
  )
}
