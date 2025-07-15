<script lang="ts">
	import type { Academic } from '@business/Schema';
	import { getAcademicRoleLabel } from '@business/dto/enum/AcademicRole';
	import { Phone } from 'phosphor-svelte';

	export let data;

	const formatter = new Intl.DateTimeFormat('es-ES', {
		dateStyle: 'long',
		timeStyle: 'short',
		hour12: true
	});
</script>

<main class="max-w-6xl w-full mx-auto py-8 px-4 grid gap-8">
	<header>
		<h1 class="text-2xl text-white font-semibold tracking-tight">Listado de Académico</h1>
	</header>
	<nav class="flex gap-4">
		<a class="button w-fit" href="/dashboard">Volver a Inicio</a>
		<a class="button button--main w-fit" href="/dashboard/register/academic">Registrar Académico</a>
	</nav>
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each data.academicList as academic (academic.workerID)}
			{@render GUIAcademicCard(academic)}
		{/each}
	</div>
</main>

{#snippet GUIAcademicCard(academic: Academic)}
	<article class="relative border border-neutral-900 p-4">
		<div
			class="absolute top-0 left-0 h-10 px-4 grid place-content-center bg-neutral-900 rounded-br-md"
		>
			<p class="font-medium">
				{academic.email}
			</p>
		</div>
		<div class="mt-10">
			<p class="text-sm text-neutral-400">
				{getAcademicRoleLabel(academic.role)}
			</p>
			<h2 class="text-lg text-white font-semibold tracking-tight">
				{academic.name}
				{academic.lastName}
			</h2>
			<p class="text-sm text-neutral-400">
				ID de Trabajador {academic.workerID}
			</p>
			<p class="mt-2 text-sm text-neutral-400 flex items-center gap-2 font-medium text-white">
				<Phone class="text-teal-400"  size={18} />
				{academic.phoneNumber}
			</p>
			{#if academic.createdAt}
				<p class="mt-2 text-sm text-neutral-400">
					Creado el {formatter.format(new Date(academic.createdAt))}
				</p>
			{/if}
		</div>
	</article>
{/snippet}
