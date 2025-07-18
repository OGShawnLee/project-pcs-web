import type RepresentativeDTO from '@business/dto/RepresentativeDTO';
import Schema from '@business/Schema';
import DBClient from '@db/DBClient';
import { createResult } from '$lib/Common';

export default class RepresentativeDAO {
	public static async createOne(data: RepresentativeDTO) {
		const { error } = await DBClient.from('representative').insert(data.createForInsertion());
		return createResult(error ? null : data.email, error);
	}

	public static async getMany(limit = 12) {
		const { data, error } = await DBClient.from('representative').select().limit(limit);
		return createResult(
			data
				? data.map((representative) =>
						Schema.getValidRepresentative({
							name: representative.name,
							lastName: representative.last_name,
							email: representative.email,
							phoneNumber: representative.phone_number,
							emailOrganization: representative.email_organization,
							position: representative.position,
							createdAt: representative.created_at
						})
					)
				: null,
			error
		);
	}
}
