import type { Organization } from "@business/Schema";
import type DTOShape from "@business/dto/DTOShape";
import Schema from "@business/Schema";

export default class OrganizationDTO implements Organization, DTOShape {
  public readonly name: string;
  public readonly address: string;
  public readonly email: string;
  public readonly createdAt: Date | null;
  public readonly serializable: Organization;

  /**
   * Creates a new instance of OrganizationDTO.
   * @param configuration - The configuration object containing academic details.
   * @throws {ValiError} If the provided configuration is invalid.
   */
  public constructor(configuration: Organization) {
    const validated = Schema.getValidOrganization(configuration);
    this.serializable = validated;
    this.name = validated.name;
    this.address = validated.address;
    this.email = validated.email;
    this.createdAt = validated.createdAt ?? null;
  }

  public createForInsertion(): Organization {
    return { name: this.name, email: this.email, address: this.address };
  }

  public equals(other: Organization): boolean {
    return (
      this.name === other.name &&
      this.address === other.address &&
      this.email === other.email
    );
  }

  public toSnakeCase() {
    return {
      name: this.name,
      email: this.email,
      address: this.address,
      created_at: this.createdAt
    };
  }
}