const getTodayDate = (): string => {
  return new Date().toLocaleDateString("pt-BR")
}

export default getTodayDate