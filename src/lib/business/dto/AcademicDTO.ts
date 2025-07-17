import type { Academic } from '@business/Schema';
import type { AcademicRole } from '@business/dto/enum';
import Schema from '@business/Schema';
import PersonDTO from '@business/dto/PersonDTO';

export default class AcademicDTO extends PersonDTO implements Academic {
	public readonly workerID: string;
	public readonly role: AcademicRole;
	public readonly serializable: Academic;

	/**
	 * Creates a new instance of AcademicDTO.
	 * @param configuration - The configuration object containing academic details.
	 * @throws {ValiError} If the provided configuration is invalid.
	 */
	public constructor(configuration: Academic) {
		const validated = Schema.getValidAcademic(configuration);
		super(validated);
		this.serializable = validated;
		this.workerID = validated.workerID;
		this.role = validated.role;
	}

	public equals(other: Academic): boolean {
		return super.equals(other) && this.workerID === other.workerID && this.role === other.role;
	}

	public toSnakeCase() {
		return {
			name: this.name,
			last_name: this.lastName,
			email: this.email,
			phone_number: this.phoneNumber,
			worker_id: this.workerID,
			role: this.role,
			created_at: this.createdAt
		};
	}
}
