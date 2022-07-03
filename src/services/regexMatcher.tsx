const regexMatcher = (value1: RegExp, value2: string): boolean => {
    let result: RegExpMatchArray = value2.match(value1)

    if (Array.isArray(result)) {
        return true
    } else if (result == null) {
        return false
    }
}

export default regexMatcher