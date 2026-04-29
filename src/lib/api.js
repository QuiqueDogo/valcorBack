export async function apiFetch(url, options = {}) {
    const token = typeof window !== 'undefined'
        ? localStorage.getItem('token')
        : null

    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            ...(token && { Authorization: `Bearer ${token}` })
        }
    })

    if (res.status === 401) {
        window.location.href = '/login'
        return
    }

    return res.json()
}