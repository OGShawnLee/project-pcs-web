import DBClient from '@db/DBClient';
import Schema from '@business/Schema';
import OrganizationDTO from '@business/dto/OrganizationDTO';
import { createResult } from '$lib/Common';

export default class OrganizationDAO {
	public static async createOne(data: OrganizationDTO) {
		const { error } = await DBClient.from('organization').insert(data.createForInsertion());
		return createResult(error ? null : data.email, error);
	}

	public static async getMany(limit = 12) {
		const { data, error } = await DBClient.from('organization')
			.select('*')
			.limit(limit)
			.order('created_at', { ascending: false });
		return createResult(
			data
				? data.map((organization) =>
						Schema.getValidOrganization({
							name: organization.name,
							email: organization.email,
							address: organization.address,
							createdAt: organization.created_at
						})
					)
				: null,
			error
		);
	}
}
