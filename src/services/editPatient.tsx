import axios from "axios"
import { BASE_URL } from "../constants/urls"
import { Form } from "../types/Form"

export const editPatient = async (form: Form, id: string) => {

  axios.put(`${BASE_URL}/patient/${id}`, form)
    .then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error?.response?.data)
    })
}