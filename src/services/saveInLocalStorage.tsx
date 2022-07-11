// const saveInLocalStorage = (event) => {
//   let dataStorage = JSON.parse(localStorage.getItem("form"))
//   let newData = { key: event.target.id.trim(), value: event.target.value.trim() }

//   let newDataStorage = dataStorage?.filter((item) => {
//     if (item.key != newData.key) {
//       return true
//     }
//   })

//   newDataStorage.push(newData)
//   localStorage.setItem("form", JSON.stringify(newDataStorage));
// }

// export default saveInLocalStorage

// const saveInLocalStorage = (event) => {
//   let dataStorage = JSON.parse(localStorage.getItem("form"))
//   let newData = { [event.target.id.trim()]: event.target.value.trim() }

//   let newDataStorage = dataStorage.filter((item) => {
//     if (Object.keys(newData)[0] != Object.keys(item)[0]) {
//       return true
//     }
//   })

//   newDataStorage.push(newData)
//   localStorage.setItem("form", JSON.stringify(newDataStorage));
// }

// export default saveInLocalStorage


const saveInLocalStorage = async (event) => {

  let dataStorage = await JSON.parse(localStorage.getItem("form")) || []
  let newData = { [event?.target?.id?.trim()]: event?.target?.value?.trim() }

  let newDataStorage = dataStorage?.filter((item) => {
    if (Object.keys(newData)[0] != Object.keys(item)[0]) {
      return true
    }
  })

  newDataStorage?.push(newData)
  localStorage.setItem("form", JSON.stringify(newDataStorage));
}
export default saveInLocalStorage