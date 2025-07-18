<script lang="ts">
	import Schema, { type Organization, type Representative } from '@business/Schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	import GUIInput from './GUIInput.svelte';
	import GUIFormModal from './GUIFormModal.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Representative>;
	export let organization: Organization;

	const form = superForm(data, {
		validators: valibotClient(Schema.REPRESENTATIVE_SCHEMA)
	});
	const { form: input, enhance } = form;
</script>

<GUIFormModal {enhance} title="Registrar Representante">
	{#snippet fields()}
		<GUIInput
			{form}
			name="name"
			label="Nombre"
			placeholder="Introduzca el Nombre del Representante"
		>
			{#snippet field(props)}
				<input class="input" type="text" {...props} required bind:value={$input.name} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="lastName"
			label="Apellido"
			placeholder="Introduzca el Apellido del Representante"
		>
			{#snippet field(props)}
				<input class="input" type="text" {...props} required bind:value={$input.lastName} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="email"
			label="Correo Electrónico"
			placeholder="Introduzca el Correo Electrónico del Representante"
		>
			{#snippet field(props)}
				<input class="input" type="email" {...props} required bind:value={$input.email} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="phoneNumber"
			label="Número de Teléfono"
			placeholder="Introduzca el Número de Teléfono del Representante"
		>
			{#snippet field(props)}
				<input class="input" type="tel" {...props} required bind:value={$input.phoneNumber} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="position"
			label="Cargo"
			placeholder="Introduzca el Cargo del Representante"
		>
			{#snippet field(props)}
				<input class="input" type="text" {...props} required bind:value={$input.position} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="emailOrganization"
			label="Organización"
			placeholder="Seleccione la Organización del Representante"
		>
			{#snippet field(props)}
				<div class="input flex items-center">
					<span>{organization.name} ({$input.emailOrganization})</span>
				</div>
				<input
					class="input"
					type="hidden"
					{...props}
					required
					value={$input.emailOrganization}
					readonly
				/>
			{/snippet}
		</GUIInput>
	{/snippet}
	{#snippet button()}
		<button class="button button--main" type="submit"> Registrar Representante </button>
		<a class="button" href="/"> Cancelar </a>
	{/snippet}
</GUIFormModal>
