// Написать функцию, которая принимает на вход URL, например https://www.google.com/doodles/rubiks-cube,
// и возвращает объект вида:
// {protocol: “http”, hostname: “www.google.com”,child: {path: “doodles”, child: {rubiks-cube}}}
// URL может быть любой длины, но формат всегда будет {protocol}://{hostname}/path/path/…/path

function webAddress(addr) {
    const split = addr.split('/')
    const protocol = split[0].slice(0, split.length - 2)
    const hostname = split[2]
    let afterHostname = addr.split('://')[1].split('/')
    afterHostname = afterHostname.slice(1, afterHostname.length)
    let child = recursiveChild(afterHostname)

    return {protocol, hostname, child}

}

function recursiveChild(pathArray) {
    if (pathArray.length <= 1) {

        return {
            path: pathArray[0]
        }
    }

    return {
        path: pathArray[0],
        child: recursiveChild(pathArray.slice(1, pathArray.length))
    }
}

console.log(webAddress('https://www.google.com/doodles/rubiks-cube/fadlsj/ghasfhqe/adf'))