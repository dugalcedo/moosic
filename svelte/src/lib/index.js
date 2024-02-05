export const backendURL = endpoint => (location.href.includes('localhost') ? 'http://localhost:4321' : '') + endpoint

export async function hämta(options = {}) {

    // Defaults
    const {
        endpoint,
        method = "GET",
        responseType = 'json',
        requestType = 'application/json',
        headers = {},
        body,
        onRes = res => {},
        onBadRes = res=>{},
        onGoodRes = data=>data
    } = options

    if (!endpoint) {
        console.warn("No endpoint provided")
        return
    }

    const fetchOptions = {
        method,
        headers: {
            "Content-Type": requestType,
            'moosic-token': localStorage.getItem('moosic-token'),
            ...headers
        }
    }

    if (body) fetchOptions.body = JSON.stringify(body)

    const token = localStorage.getItem('moosic-token')
    if (token) fetchOptions.headers['x-token'] = token

    const res = await fetch(endpoint, fetchOptions)

    onRes(res)

    if (!res.ok) {
        console.log(`Failed making ${method} request to ${endpoint}.`)
        console.log(res)
        onBadRes(res)
        return
    }

    const data = await res[responseType]()

    if (data.token) {
        // document.cookie = `token=${data.token};max-age=${14*24*3600};`
        localStorage.setItem('moosic-token', data.token)
    }

    return onGoodRes(data)
}