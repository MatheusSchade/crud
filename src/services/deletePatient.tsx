import axios from "axios"
import { BASE_URL } from "../constants/urls"

export const deletePatient = async (id: string) => {
  let showError: string = null

  await axios.delete(`${BASE_URL}/patient/${id}`)
    .then(() => { }).catch(() => {
      showError = "error"
    })

  if (showError) {
    return showError
  }
}