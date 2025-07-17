import Schema from '@business/Schema';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { valibot } from 'sveltekit-superforms/adapters';
import { OrganizationDTO } from '@business/dto';
import { OrganizationDAO } from '@db/dao';
import { error } from '@sveltejs/kit';

export async function load() {
	return {
		form: await superValidate(valibot(Schema.ORGANIZATION_SCHEMA))
	};
}

export const actions = {
	async default(event) {
		const form = await superValidate(event, valibot(Schema.ORGANIZATION_SCHEMA));

		if (form.valid) {
			const { error: err } = await OrganizationDAO.createOne(new OrganizationDTO(form.data));

			if (err) {
				if (err.kind === 'DATABASE-DUPLICATE') {
					return setError(
						form,
						'email',
						'Ya existe una Organización con el mismo correo electrónico.'
					);
				} else {
					error(500, { message: err.message });
				}
			}
		}

		return { form };
	}
};
