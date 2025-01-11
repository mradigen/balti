<script lang="ts">
	import { Expiry } from '$lib/expiry';

	export let name: string;
	export let url: string;
	export let expiry: Expiry;
</script>

<div class="grid w-full grid-cols-3 justify-between bg-gray-100 p-4 text-center">
	<p class="text-left">{name}</p>
	<a href={url}>{url}</a>
	<p class="text-right">{expiry.split('d')[0] + (expiry == Expiry.day ? ' day' : ' days')}</p>
</div>
