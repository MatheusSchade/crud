import axios from "axios"
import { BASE_URL } from "../constants/urls"
import { Form } from "../types/Form"
import ZipCode from "../types/ZipCode"

export const editPatient = async (form: Form, id: string, zipCodeData: ZipCode) => {
  // const name: string = newFormToEdit?.name || form?.name
  // const birthdate: string = newFormToEdit?.birthdate || form?.birthdate
  // const email: string = newFormToEdit?.email || form?.email
  // const zipCode: string = newFormToEdit?.zipCode || form?.zipCode
  const address: string = zipCodeData?.logradouro || form?.address
  // const numberAddress: string = newFormToEdit?.numberAddress || form?.numberAddress
  // const complement: string = newFormToEdit?.complement || form?.complement
  const neighborhood: string = zipCodeData?.bairro || form?.neighborhood
  const city: string = zipCodeData?.localidade || form?.city
  const state: string = zipCodeData?.uf || form?.state

  let body = { ...form, address, neighborhood, city, state }

  axios.put(`${BASE_URL}/patient/${id}`, body)
    .then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error?.response?.data)
    })
}