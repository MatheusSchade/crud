const convertDate = (date: string) => {
  if (date?.split("-")[0]?.length == 4) {
    return date?.split("-").reverse().join("-");
  }
  else if (date?.split("/")[2]?.length == 4) {
    return date?.split("/").reverse().join("-");
  }
};

export default convertDate