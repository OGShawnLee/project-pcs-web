import type RepresentativeDTO from '@business/dto/RepresentativeDTO';
import DBClient from '@db/DBClient';
import { createResult } from '$lib/Common';

export default class RepresentativeDAO {
	public static async createOne(data: RepresentativeDTO) {
		const { error } = await DBClient.from('representative').insert(data.createForInsertion());
		return createResult(error ? null : data.email, error);
	}
}
