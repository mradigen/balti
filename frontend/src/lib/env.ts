import { Expiry } from "$lib/expiry";

type Env = {
	SHORTENER_URL: string;
	MINIO_ENDPOINT: string;
	MINIO_REGION: string;
	BUCKET_NAME: string;
	DEFAULT_EXPIRY: Expiry;
};

export const env: Env = {
	SHORTENER_URL: import.meta.env.VITE_SHORTENER_URL,
	MINIO_ENDPOINT: import.meta.env.VITE_MINIO_ENDPOINT,
	MINIO_REGION: import.meta.env.VITE_MINIO_REGION || 'us-east-1',
	BUCKET_NAME: import.meta.env.VITE_BUCKET_NAME || 'balti',
	DEFAULT_EXPIRY: (import.meta.env.VITE_DEFAULT_EXPIRY as Expiry) || Expiry.day,
};

if (!env.SHORTENER_URL) {
	console.warn('VITE_SHORTENER_URL is not set. Bucket URLs will not be shortened.');
}

if (!env.MINIO_ENDPOINT) {
	throw new Error('Missing VITE_MINIO_ENDPOINT environment variable.');
}

if (!env.BUCKET_NAME) {
	console.warn('VITE_BUCKET_NAME is not set. Using default value "balti".');
}

if (!env.DEFAULT_EXPIRY) {
	console.warn('VITE_DEFAULT_EXPIRY is not set. Using default value "1d".');
}
