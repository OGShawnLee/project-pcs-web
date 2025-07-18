<script lang="ts">
	import type { Representative } from '@business/Schema';
	import { CalendarPlus, Phone } from 'phosphor-svelte';

	export let representative: Representative;

	const formatter = new Intl.DateTimeFormat('es-ES', {
		dateStyle: 'long',
		timeStyle: 'short',
		hour12: true
	});
</script>

<article class="relative border border-neutral-900 p-4 overflow-hidden">
	<div
		class="absolute top-0 left-0 h-10 px-4 grid place-content-center bg-neutral-900 rounded-br-lg"
	>
		<p class="text-white font-medium">
			{representative.email}
		</p>
	</div>
	<div class="mt-10">
		<p class="text-sm text-neutral-400">
			{representative.position}
		</p>
		<h2 class="text-lg text-white font-semibold tracking-tight">
			{representative.name}
			{representative.lastName}
		</h2>
		<p class="mt-2 text-sm text-neutral-400 flex items-center gap-2 font-medium text-white">
			<Phone class="text-teal-400" size={18} />
			{representative.phoneNumber}
		</p>
		{#if representative.createdAt}
			{@const date = new Date(representative.createdAt)}
			<time
				class="mt-2 text-sm text-neutral-400 flex items-center gap-2 font-medium"
				datetime={date.toISOString()}
				title="Fecha de Registro"
			>
				<CalendarPlus class="text-teal-400" size={18} />
				{formatter.format(date)}
			</time>
		{/if}
	</div>
</article>
