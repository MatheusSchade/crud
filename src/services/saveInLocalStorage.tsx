import LocalStorageData from "../types/LocalStorageData"

const saveInLocalStorage = (event: any) => {
  let dataStorage = JSON.parse(localStorage.getItem("form")) || []
  let newData = { key: event.target.id.trim(), value: event.target.value.trim() }

  let newDataStorage = dataStorage?.filter((item: LocalStorageData) => {
    if (item.key != newData.key) {
      return true
    }
  })

  newDataStorage.push(newData)
  localStorage.setItem("form", JSON.stringify(newDataStorage));
}

export default saveInLocalStorage
