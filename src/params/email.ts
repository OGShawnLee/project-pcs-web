import Schema from '@business/Schema';
import { safeParse } from 'valibot';

export function match(param: string) {
	return safeParse(Schema.EMAIL_SCHEMA, param);
}
