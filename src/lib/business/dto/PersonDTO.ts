import type { Person } from "@business/Schema";
import Schema from "@business/Schema";

export default abstract class PersonDTO implements Person {
  public readonly name: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phoneNumber: string;

  /**
   * Creates a new instance of PersonDTO.
   * @param configuration - The configuration object containing configuration details.
   * @throws {ValiError} If the provided configuration is invalid.
   */
  public constructor(configuration: Person) {
    const validated = Schema.getValidPerson(configuration);
    this.name = validated.name;
    this.lastName = validated.lastName;
    this.email = validated.email;
    this.phoneNumber = validated.phoneNumber;
  }

  public equals(other: Person): boolean {
    return (
      this.name === other.name &&
      this.lastName === other.lastName &&
      this.email === other.email &&
      this.phoneNumber === other.phoneNumber
    );
  }

  public abstract toSnakeCase(): Record<string, string>;
}