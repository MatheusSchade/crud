import axios from "axios"
import ZipCode from "../types/ZipCode"

export const getZipCode = async (code: string): Promise<ZipCode> => {
  let zipCodeData = null
  let zipCode = code.replace(/\D/g, '')
  if (zipCode?.length == 8) {
    await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      .then((response) => {
        zipCodeData = response?.data
      }).catch((error) => {
        console.log(error?.response?.data)
        zipCodeData = `error`
      })
  }
  console.log(zipCodeData)
  return zipCodeData
}