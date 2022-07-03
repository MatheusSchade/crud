const checkState = (value1: string | string[], value2: string): boolean => {
    if (value1?.includes(value2)) {
        return true
    } else { return false }
}
export default checkState