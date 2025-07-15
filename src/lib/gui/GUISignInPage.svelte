<script lang="ts">
	import Schema, { type SignInShape } from '@business/Schema.js';
	import type { SuperValidated } from 'sveltekit-superforms';
	import GUIInput from './GUIInput.svelte';
	import GUIFormModal from './GUIFormModal.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<SignInShape>;

	const form = superForm(data, {
		validators: valibotClient(Schema.SIGN_IN_SCHEMA)
	});
	const { form: input, enhance } = form;
</script>

<GUIFormModal {enhance} title="Iniciar Sesión">
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
		<GUIInput {form} name="password" label="Contraseña" placeholder="Introduzca su Contraseña">
			{#snippet field(props)}
				<input class="input" type="password" {...props} required bind:value={$input.password} />
			{/snippet}
		</GUIInput>
	{/snippet}
	{#snippet button()}
		<button class="button button--main" type="submit"> Continuar </button>
		<a class="button" href="/"> Cancelar </a>
	{/snippet}
</GUIFormModal>
