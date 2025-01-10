<script lang="ts">
	import { uploadFile } from '$lib/minio';
	import { shortenURL } from '$lib/short';
	import { env } from '$lib/env';

	const defaultExpiry = env.DEFAULT_EXPIRY;

	let fileInput: HTMLInputElement;

	async function upload(file: File) {
		let longURL = await uploadFile(file, defaultExpiry);
		if (longURL == null) return alert('Error');
		console.log(await shortenURL(longURL));
	}

	export function fileDropped(e: DragEvent) {
		if (e.dataTransfer?.items) {
			[...e.dataTransfer?.items].forEach(async (item) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					if (file == null) return;
					upload(file);
				}
			});
		}
	}

	export function fileInputUpload() {
		if (fileInput.files == null) return;
		for (let file of fileInput.files) {
			upload(file);
		}
	}
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<input type="file" class="hidden" bind:this={fileInput} on:change={fileInputUpload} />
	<button
		class="flex h-1/2 w-1/2 items-center justify-center rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
		on:click={() => fileInput.click()}
		on:drop|preventDefault={fileDropped}
		on:dragover|preventDefault
	>
		<h1 class="text-center text-5xl font-extrabold">Drop your file here</h1>
	</button>
</div>
