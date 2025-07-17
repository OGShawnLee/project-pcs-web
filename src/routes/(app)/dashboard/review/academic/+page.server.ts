import { AcademicDAO } from '@db/dao';
import { error } from '@sveltejs/kit';

export async function load() {
	const { data: academicList, error: err } = await AcademicDAO.getMany();

	if (err) {
		error(500, { message: err.message });
	}

	return { academicList };
}
