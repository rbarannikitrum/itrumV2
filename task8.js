function address(str, obj) {
    let string = str + '?'
    for (const objKey in obj) {
        string = string +`${objKey}=${obj[objKey]}`
    }
    return string
}

console.log(address("https://docs.google.com", { id: "terdh673bb8", limit: 5, offset: 0 } ))