import type { Person } from "@business/Schema";

export default abstract class PersonDTO implements Person {
  public readonly name: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phoneNumber: string;

  /**
   * Creates a new instance of PersonDTO.
   * @param configuration - The configuration object containing person details.
   */
  public constructor(configuration: Person) {
    this.name = configuration.name;
    this.lastName = configuration.lastName;
    this.email = configuration.email;
    this.phoneNumber = configuration.phoneNumber;
  }

  public equals(other: Person): boolean {
    return (
      this.name === other.name &&
      this.lastName === other.lastName &&
      this.email === other.email &&
      this.phoneNumber === other.phoneNumber
    );
  }
}