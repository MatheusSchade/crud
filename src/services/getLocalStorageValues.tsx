const getLocalStorageValues = (key: string) => {
  let dataStorage = JSON.parse(localStorage.getItem("form")) || []
  let valueToReturn = ""
  if (dataStorage) {
    dataStorage?.filter((item) => {
      if (item?.key === key && item?.value) {
        valueToReturn = item?.value
      }
    })
  }
  return valueToReturn
}

export default getLocalStorageValues