import axios from "axios"
import { BASE_URL } from "../constants/urls"
import { Form } from "../types/Form"
import ZipCode from "../types/ZipCode"
import filterZipCode from "./filterZipCode"

export const editPatient = async (form: Form, id: string, zipCodeData: ZipCode) => {
  const address: string = zipCodeData?.logradouro || form?.address
  const neighborhood: string = zipCodeData?.bairro || form?.neighborhood
  const city: string = zipCodeData?.localidade || form?.city
  const state: string = zipCodeData?.uf || form?.state
  const zipCode: string = filterZipCode(zipCodeData?.cep) || filterZipCode(form?.zipCode)

  let body = { ...form, address, neighborhood, city, state, zipCode }
  let response = null

  await axios.put(`${BASE_URL}/patient/${id}`, body)
    .then(() => { }).catch(() => {
      response = `error`
    })

  return response
}