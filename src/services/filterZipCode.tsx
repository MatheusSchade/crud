const filterZipCode = (zipCode: string): string => {
  return zipCode?.replace(/\D/g, '')?.replace("-", '')?.replace(".", '')
}

export default filterZipCode