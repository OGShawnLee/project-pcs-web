<script lang="ts">
	import GUIAcademicCard from '@gui/GUIAcademicCard.svelte';
	import type { Academic } from '@business/Schema';

	export let academicList: Academic[];
</script>

<main class="pt-80px py-8 px-4 grid gap-8">
	<header>
		<h1 class="text-2xl text-white font-semibold tracking-tight">Listado de Académicos</h1>
	</header>
	<nav class="flex gap-4">
		<a class="button button--main w-fit" href="/dashboard/register/academic">Registrar Académico</a>
	</nav>
	<div class="grid gap-8 lg:grid-cols-2">
		{#each academicList as academic (academic.workerID)}
			<GUIAcademicCard {academic} />
		{/each}
	</div>
</main>
