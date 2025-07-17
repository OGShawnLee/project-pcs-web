<script lang="ts">
	import { enhance } from '$app/forms';
	import { SignOut } from 'phosphor-svelte';

	export let currentUser: { name: string; email: string };

	function getNameInitials(name: string): string {
		return name
			.split(' ')
			.map((part) => part.charAt(0).toUpperCase())
			.join('');
	}
</script>

<div class="relative min-h-screen max-w-6xl w-full mx-auto | flex gap-8">
	<nav class="hidden sticky h-full top-80px w-300px | xl:flex flex-col justify-between">
		<div class="flex flex-col items-start gap-4">
			<a class="font-medium hover:text-white" href="/dashboard">Inicio</a>
			<a class="font-medium hover:text-white" href="/dashboard/review/academic">Académicos</a>
			<a class="font-medium hover:text-white" href="/dashboard/review/organization">Organizaciones</a>
		</div>
		<section class="grid gap-4">
			<h2 class="hidden">User Status</h2>
			<div class="flex gap-4 items-center">
				<div
					class="size-12 flex items-center justify-center bg-gradient-to-l from-teal-400 to-cyan-600 bg-teal-400 font-bold text-lg text-white"
				>
					{getNameInitials(currentUser.name)}
				</div>
				<div>
					<p class="text-lg text-white font-medium">{currentUser.name}</p>
					<p class="text-white">{currentUser.email}</p>
				</div>
			</div>
			<form action="/auth/sign-out" method="post" use:enhance>
				<button class="button button--side flex gap-2" aria-label="Cerrar Sesión">
					Cerrar Sesión <SignOut size={24} />
				</button>
			</form>
		</section>
	</nav>
	<main class="w-full flex flex-col xl:flex-[600px]">
		<slot />
	</main>
</div>

<style>
	/* top-header-height -> 64px + container-gap -> 28px = 88px */
	nav {
		min-height: calc(100vh - 80px - 80px);
	}
</style>
