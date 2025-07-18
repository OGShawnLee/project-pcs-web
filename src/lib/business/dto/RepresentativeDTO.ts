import type { Representative } from '@business/Schema';
import Schema from '@business/Schema';
import PersonDTO from '@business/dto/PersonDTO';

export default class RepresentativeDTO extends PersonDTO implements Representative {
	public readonly emailOrganization: string;
	public readonly position: string;
	public readonly serializable: Representative;

	/**
	 * Creates a new instance of RepresentativeDTO.
	 * @param configuration - The configuration object containing academic details.
	 * @throws {ValiError} If the provided configuration is invalid.
	 */
	public constructor(configuration: Representative) {
		const validated = Schema.getValidRepresentative(configuration);
		super(validated);
		this.serializable = validated;
		this.emailOrganization = validated.emailOrganization;
		this.position = validated.position;
	}

	public createForInsertion() {
		return {
			name: this.name,
			last_name: this.lastName,
			email: this.email,
			phone_number: this.phoneNumber,
			email_organization: this.emailOrganization,
			position: this.position
		};
	}

	public equals(other: Representative): boolean {
		return super.equals(other) && this.emailOrganization === other.emailOrganization;
	}

	public toSnakeCase() {
		return {
			name: this.name,
			last_name: this.lastName,
			email: this.email,
			phone_number: this.phoneNumber,
			email_organization: this.emailOrganization,
			position: this.position,
			created_at: this.createdAt
		};
	}
}
