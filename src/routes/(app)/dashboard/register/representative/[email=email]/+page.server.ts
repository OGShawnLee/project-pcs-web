import Schema from '@business/Schema';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { valibot } from 'sveltekit-superforms/adapters';
import { RepresentativeDTO } from '@business/dto';
import { OrganizationDAO, RepresentativeDAO } from '@db/dao';
import { error } from '@sveltejs/kit';

export async function load(event) {
	const { data, error: err } = await OrganizationDAO.findOne(event.params.email);

	if (err) {
		error(500, { message: err.message });
	}

	if (data) {
		return {
			form: await superValidate(event, valibot(Schema.REPRESENTATIVE_SCHEMA), {
				defaults: {
					name: '',
					lastName: '',
					email: '',
					phoneNumber: '',
					position: '',
					emailOrganization: data.email
				}
			}),
			organization: data.serializable
		};
	}

	error(404, { message: 'La Organización solicitada no existe.' });
}

export const actions = {
	async default(event) {
		const form = await superValidate(event, valibot(Schema.REPRESENTATIVE_SCHEMA));

		if (form.valid) {
			const { error: err } = await RepresentativeDAO.createOne(new RepresentativeDTO(form.data));

			if (err) {
				if (err.kind === 'DATABASE-DUPLICATE') {
					return setError(form, 'email', 'Ya existe un Representante con este correo electrónico.');
				}

				error(500, { message: err.message });
			}
		}

		return { form };
	}
};
