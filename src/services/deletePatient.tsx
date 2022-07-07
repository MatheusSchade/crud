import axios from "axios"
import { BASE_URL } from "../constants/urls"

export const deletePatient = async (id: string) => {
  await axios.delete(`${BASE_URL}/patient/${id}`)
  .then((response) => {
    console.log(response?.data)
  })
  .catch((error) => {
    console.log(error?.response?.data)
  })
}