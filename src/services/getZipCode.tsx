import axios from "axios"
import ZipCode from "../types/ZipCode"
import filterZipCode from "./filterZipCode"

export const getZipCode = async (code: string): Promise<ZipCode> => {
  let zipCodeData = null
  let zipCode = filterZipCode(code)
  if (zipCode?.length == 8) {
    await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
      .then((response) => {
        zipCodeData = response?.data
      }).catch(() => {
        zipCodeData = `error`
      })
  }
  return zipCodeData
}