import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { Expiry } from "./expiry";
import { env } from "./env";

const s3Client = new S3Client({
	region: env.MINIO_REGION, // Default minio region
	endpoint: env.MINIO_ENDPOINT,
	credentials: { accessKeyId: "", secretAccessKey: "" },
	signer: { sign: async req => req }, // Allows anonymous access
	forcePathStyle: true, // Required for MinIO
});

export async function uploadFile(file: File, expireAfter: Expiry) {
	const objectKey = crypto.randomUUID();
	const tags = `ExpireAfter=${expireAfter}`;

	try {
		const command = new PutObjectCommand({
			Bucket: env.BUCKET_NAME,
			Key: objectKey,
			Body: file,
			Tagging: tags,
			ContentDisposition: `attachment; filename="${file.name}"`
		});

		await s3Client.send(command);
		return `${env.MINIO_ENDPOINT}/${env.BUCKET_NAME}/${objectKey}`;
	} catch (error) {
		console.error("Error uploading file:", error);
		alert("File upload failed.");
	}
}
