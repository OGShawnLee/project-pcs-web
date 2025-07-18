<script lang="ts">
	import GUIRepresentativeCard from '@gui/GUIRepresentativeCard.svelte';
	import type { Representative } from '@business/Schema';

	export let representativeList: Representative[];
</script>

<main class="pt-80px py-8 px-4 grid gap-8">
	<header>
		<h1 class="text-2xl text-white font-semibold tracking-tight">Listado de Representantes</h1>
	</header>
	<div class="grid gap-8 lg:grid-cols-2">
		{#each representativeList as representative (representative.email)}
			<GUIRepresentativeCard {representative} />
		{/each}
	</div>
</main>
