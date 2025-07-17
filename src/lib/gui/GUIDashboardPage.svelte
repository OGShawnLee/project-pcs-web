<script lang="ts">
	import type { Academic } from '@business/Schema';
  import GUIAcademicCard from '@gui/GUIAcademicCard.svelte';

	export let data: {
		academicList: Academic[];
	};
</script>

<main class="pt-80px py-8 px-4 grid gap-8">
	<header>
		<h1 class="text-2xl text-white font-semibold tracking-tight">Dashboard</h1>
	</header>
	<section class="grid gap-4">
    <header>
      <h2 class="text-xl text-white font-semibold tracking-tight">Académicos</h2>
    </header>
		<div class="grid gap-8 lg:grid-cols-2">
			{#each data.academicList as academic (academic.workerID)}
				<GUIAcademicCard {academic} />
			{/each}
		</div>
	</section>
</main>
