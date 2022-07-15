
export default async function fetchAPI(url: string, key: string | null, query: string, variables: any) {
	const headers: Record<string, any> = { 'Content-Type': 'application/json' }

	if (key) {
		headers[
			'Authorization'
		] = `Apikey ${key}`
	} else {
		console.log('Error: missing key!')
	}

	const res = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables: variables
		}),
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		return json
	}
	return json
}