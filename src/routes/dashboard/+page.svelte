<script>
	import { enhance } from '$app/forms';

	export let data;
</script>

<svelte:head>
	<title>Dashboard - ProTrack</title>
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center">
	<main class="max-w-xl w-full mx-auto p-8 flex flex-col gap-8 border border-neutral-900">
		<div class="flex items-center gap-4">
			<a class="button button--main" href="/dashboard/review/academic"> Listado de Académico </a>
			<a class="button button--main" href="/dashboard/register/academic"> Registrar Académico </a>
		</div>
		<div class="grid gap-4">
			<p class="text-white text-center">{data.email}</p>
			<form action="/auth/sign-out" method="post" use:enhance>
				<button class="button button--side" aria-label="Cerrar Sesión">
					Cerrar Sesión
				</button>
			</form>
		</div>
	</main>
</div>
