<script lang="ts">
	import Schema, { type Organization } from '@business/Schema.js';
	import type { SuperValidated } from 'sveltekit-superforms';
	import GUIInput from './GUIInput.svelte';
	import GUIFormModal from './GUIFormModal.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Organization>;

	const form = superForm(data, {
		validators: valibotClient(Schema.ORGANIZATION_SCHEMA)
	});
	const { form: input, enhance } = form;
</script>

<GUIFormModal {enhance} title="Registrar Organización">
	{#snippet fields()}
		<GUIInput
			{form}
			name="name"
			label="Nombre"
			placeholder="Introduzca el Nombre de la Organización"
		>
			{#snippet field(props)}
				<input class="input" type="text" {...props} required bind:value={$input.name} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="email"
			label="Correo Electrónico"
			placeholder="Introduzca el Correo Electrónico de la Organización"
		>
			{#snippet field(props)}
				<input class="input" type="email" {...props} required bind:value={$input.email} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="address"
			label="Dirección"
			placeholder="Introduzca la Dirección de la Organización"
		>
			{#snippet field(props)}
				<input class="input" type="tel" {...props} required bind:value={$input.address} />
			{/snippet}
		</GUIInput>
	{/snippet}
	{#snippet button()}
		<button class="button button--main" type="submit"> Registrar Organización </button>
		<a class="button" href="/"> Cancelar </a>
	{/snippet}
</GUIFormModal>
