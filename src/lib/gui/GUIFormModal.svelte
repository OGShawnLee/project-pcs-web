<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properties {
		enhance: (el: HTMLFormElement) => void;
		fields: Snippet<[]>;
		button: Snippet<[]>;
		title: string;
		subtitle?: string;
	}

	const { enhance, fields, button, title, subtitle }: Properties = $props();
</script>

<main class="min-h-screen flex items-center justify-center">
	<form
		class="max-w-xl w-full mx-auto flex flex-col gap-8 border border-neutral-900"
		method="POST"
		use:enhance
	>
		<header class="p-8 grid gap-2 border-b border-neutral-900">
			<h1 class="text-2xl text-white font-semibold tracking-tight">{title}</h1>
			{#if subtitle}
				<p class="text-neutral-400 text-sm">{subtitle}</p>
			{/if}
		</header>
		<div class="pb-8 px-8 flex flex-col gap-4">
			<div class="contents">
				{@render fields()}
			</div>
			<div class="grid sm:grid-cols-2 gap-4">
				{@render button()}
			</div>
		</div>
	</form>
</main>
