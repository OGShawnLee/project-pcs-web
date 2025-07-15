<script lang="ts">
	import Schema, { type Academic } from '@business/Schema.js';
	import type { SuperValidated } from 'sveltekit-superforms';
	import GUIInput from './GUIInput.svelte';
	import GUIFormModal from './GUIFormModal.svelte';
	import { CaretUpDown, Check } from 'phosphor-svelte';
	import { Select } from 'bits-ui';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { AcademicRole, getAcademicRoleLabel } from '@business/dto/enum';

	export let data: SuperValidated<Academic>;

	const form = superForm(data, {
		validators: valibotClient(Schema.ACADEMIC_SCHEMA)
	});
	const { form: input, enhance } = form;
</script>

<GUIFormModal {enhance} title="Registrar Académico">
	{#snippet fields()}
		<GUIInput {form} name="name" label="Nombre" placeholder="Introduzca el Nombre del Académico">
			{#snippet field(props)}
				<input class="input" type="text" {...props} required bind:value={$input.name} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="lastName"
			label="Apellido"
			placeholder="Introduzca el Apellido del Académico"
		>
			{#snippet field(props)}
				<input class="input" type="text" {...props} required bind:value={$input.lastName} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="email"
			label="Correo Electrónico"
			placeholder="Introduzca el Correo Electrónico del Académico"
		>
			{#snippet field(props)}
				<input class="input" type="email" {...props} required bind:value={$input.email} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="phoneNumber"
			label="Número de Teléfono"
			placeholder="Introduzca el Número de Teléfono del Académico"
		>
			{#snippet field(props)}
				<input class="input" type="tel" {...props} required bind:value={$input.phoneNumber} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="workerID"
			label="ID del Trabajador"
			placeholder="Introduzca el ID del Trabajador del Académico"
		>
			{#snippet field(props)}
				<input class="input" type="tel" {...props} required bind:value={$input.workerID} />
			{/snippet}
		</GUIInput>
		<GUIInput
			{form}
			name="role"
			label="Rol del Académico"
			placeholder="Seleccione el Rol del Académico"
		>
			{#snippet field(props)}
				<Select.Root type="single" bind:value={$input.role} name={props.name}>
					<Select.Trigger
						class="h-12 px-4 flex items-center justify-between w-full border border-neutral-800 text-white font-medium placeholder-neutral-500"
						{...props}
					>
						{getAcademicRoleLabel($input.role) || props.placeholder}
						<CaretUpDown size={20} />
					</Select.Trigger>
					<Select.Content
						class="max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] p-1 z-50 focus-override bg-black shadow-xl border border-neutral-800 outline-hidden select-none"
						sideOffset={8}
					>
						{#each Object.values(AcademicRole) as role (role)}
							<Select.Item
								class="h-12 px-3 flex items-center justify-between text-neutral-400 data-[selected]:text-white data-[highlighted]:(bg-neutral-900 text-white)"
								value={role}
							>
								{#snippet children({ selected })}
									{getAcademicRoleLabel(role)}
									{#if selected}
										<Check size={20} aria-label="Check" />
									{/if}
								{/snippet}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</GUIInput>
	{/snippet}
	{#snippet button()}
		<button class="button button--main" type="submit"> Registrar Académico </button>
		<a class="button" href="/"> Cancelar </a>
	{/snippet}
</GUIFormModal>
