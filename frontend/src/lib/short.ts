import { env } from "$lib/env";

export async function shortenURL(url: string) {
	try {
		let res = await fetch(`${env.SHORTENER_URL}/shorten?url=${url}`);
		let json = await res.json();
		return `${env.SHORTENER_URL}/${json.short_url}`;
	} catch {
		return alert("Error occured in shortening");
	}
}
