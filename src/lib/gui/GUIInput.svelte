<script lang="ts" generics="Form extends Record<string, unknown>, Path extends FormPath<Form>">
	import type { FormPath, SuperForm } from 'sveltekit-superforms';
	import type { Snippet } from 'svelte';
	import type { ControlAttrs } from 'formsnap';
	import { Control, Field, FieldErrors, Label } from 'formsnap';

	interface Properties {
		form: SuperForm<Form>;
		name: Path;
		label: string;
		field: Snippet<[ControlAttrs & { placeholder: string }]>;
		placeholder: string;
	}

	const { form, name, field, placeholder, label }: Properties = $props();
</script>

<div class="grid gap-2">
	<Field {form} {name}>
		<Control>
			{#snippet children({ props })}
				<Label class="text-white">{label}</Label>
				{@render field({ ...props, placeholder })}
			{/snippet}
		</Control>
		<FieldErrors class="text-xs text-rose-400" />
	</Field>
</div>
