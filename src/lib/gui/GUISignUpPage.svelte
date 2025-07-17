<script lang="ts">
	import Schema, { type SignUpShape } from '@business/Schema.js';
	import type { SuperValidated } from 'sveltekit-superforms';
	import GUIInput from './GUIInput.svelte';
	import GUIFormModal from './GUIFormModal.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<SignUpShape>;

	const form = superForm(data, {
		validators: valibotClient(Schema.SIGN_UP_SCHEMA)
	});
	const { form: input, enhance } = form;
</script>

<GUIFormModal
	{enhance}
	title="Iniciar Sistema"
	subtitle="Bienvenido a ProTrack, cree su cuenta de Coordinador para comenzar."
>
	{#snippet fields()}
		<GUIInput
			{form}
			name="email"
			label="Correo Electrónico"
			placeholder="Introduzca su Correo Electrónico"
		>
			{#snippet field(props)}
				<input class="input" type="email" {...props} required bind:value={$input.email} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="name"
			label="Nombre Completo"
			placeholder="Introduzca su Nombre Completo"
		>
			{#snippet field(props)}
				<input class="input" type="text" {...props} required bind:value={$input.name} />
			{/snippet}
		</GUIInput>
		<GUIInput {form} name="password" label="Contraseña" placeholder="Introduzca su Contraseña">
			{#snippet field(props)}
				<input class="input" type="password" {...props} required bind:value={$input.password} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="confirmPassword"
			label="Confirmar Contraseña"
			placeholder="Confirme su Contraseña"
		>
			{#snippet field(props)}
				<input
					class="input"
					type="password"
					{...props}
					required
					bind:value={$input.confirmPassword}
				/>
			{/snippet}
		</GUIInput>
	{/snippet}
	{#snippet button()}
		<button class="button button--main" type="submit"> Continuar </button>
		<a class="button" href="/"> Cancelar </a>
	{/snippet}
</GUIFormModal>
