import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { Form } from "../types/Form";
import ZipCode from "../types/ZipCode";

export const addPatients = async (form: Form, clear: () => void, zipCodeData?: ZipCode) => {
  const address: string = zipCodeData?.logradouro || form?.address
  const neighborhood: string = zipCodeData?.bairro || form?.neighborhood
  const city: string = zipCodeData?.localidade || form?.city
  const state: string = zipCodeData?.uf || form?.state
  const createdAt: string = new Date().toLocaleDateString()
  let showError: string = null

  let body = { ...form, createdAt, address, neighborhood, city, state }

  await axios.post(`${BASE_URL}/patient`, body)
    .then(() => {
      clear()
    })
    .catch((error) => {
      showError = "error"
    })

  if (showError) {
    return showError
  }
}

