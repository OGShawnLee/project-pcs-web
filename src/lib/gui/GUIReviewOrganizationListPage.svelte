<script lang="ts">
	import GUIOrganizationCard from '@gui/GUIOrganizationCard.svelte';
	import type { Organization } from '@business/Schema';

	export let organizationList: Organization[];
</script>

<main class="pt-80px py-8 px-4 grid gap-8">
	<header>
		<h1 class="text-2xl text-white font-semibold tracking-tight">Listado de Organizaciones</h1>
	</header>
	<nav class="flex gap-4">
		<a class="button button--main w-fit" href="/dashboard/register/organization">Registrar Organización</a>
	</nav>
	<div class="grid gap-8 lg:grid-cols-2">
		{#each organizationList as organization (organization.email)}
			<GUIOrganizationCard {organization} />
		{/each}
	</div>
</main>