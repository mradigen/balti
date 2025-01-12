<script lang="ts">
	import { uploadFile } from '$lib/minio';
	import { shortenURL } from '$lib/short';
	import { env } from '$lib/env';
	import Github from '$lib/components/Github.svelte';
	import { Expiry } from '$lib/expiry';
	import UploadedItem from '$lib/components/UploadedItem.svelte';

	type FileUploaded = {
		name: string;
		url: string;
		expiry: Expiry;
	};

	let fileInput: HTMLInputElement;
	let selectedExpiry = env.DEFAULT_EXPIRY;
	let filesUploaded: FileUploaded[] = [];

	async function upload(file: File) {
		const fileID = filesUploaded.length;
		filesUploaded.push({
			name: file.name,
			url: 'Uploading...',
			expiry: selectedExpiry
		});
		filesUploaded = filesUploaded; // Trigger an update

		const longURL = await uploadFile(file, selectedExpiry);
		if (longURL == null) return alert('Error');
		const shortURL = await shortenURL(longURL);
		if (shortURL == null) return alert('Error');

		filesUploaded[fileID].url = shortURL;
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

<div class="m-auto flex w-fit min-w-[50vh] flex-col space-y-16">
	<div class="flex flex-col items-center space-y-8 font-extrabold">
		<Github></Github>

		<input type="file" class="hidden" bind:this={fileInput} on:change={fileInputUpload} multiple />
		<button
			class="flex h-[50vh] w-[50vw] items-center justify-center rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
			on:click={() => fileInput.click()}
			on:drop|preventDefault={fileDropped}
			on:dragover|preventDefault
		>
			<h1 class="text-center text-5xl">Drop your file here</h1>
		</button>

		<div class="w-fit">
			<label for="expiry" class="block text-lg text-gray-700">Select Expiry Date</label>
			<select
				id="expiry"
				class="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				bind:value={selectedExpiry}
			>
				{#each Object.entries(Expiry) as [key, value]}
					<option {value}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
				{/each}
			</select>
		</div>
	</div>
	<div
		class="flex grid-cols-3 flex-col items-center space-y-1 overflow-hidden rounded-md font-extrabold"
	>
		{#each filesUploaded as file}
			<UploadedItem name={file.name} url={file.url} expiry={file.expiry}></UploadedItem>
		{/each}
	</div>
</div>
