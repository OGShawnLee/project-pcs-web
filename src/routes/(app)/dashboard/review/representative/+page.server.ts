import { RepresentativeDAO } from '@db/dao';
import { error } from '@sveltejs/kit';

export async function load() {
	const { data: representativeList, error: err } = await RepresentativeDAO.getMany();

	if (err) {
		error(500, { message: err.message });
	}

	return { representativeList };
}
