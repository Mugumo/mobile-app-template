const baseURL = process.env.NEXT_PUBLIC_API_URL

export const login = async (payload: { email: string, password: string }) => {
    console.log(baseURL)
    const approval = await fetch(baseURL + "/authenticate", {
        method: 'POST',
        body: JSON.stringify(payload)
    }).then((response) => {
        console.log("Authenticate request status:", response?.status, response?.statusText)
        const json = response.json()
        return json
    }).catch((error) => {
        console.log("Error logging in:::", error)
        throw error
    })
    return approval
}
