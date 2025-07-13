import type { Academic } from "@business/Schema";
import PersonDTO from "@business/data/PersonDTO";

export default class AcademicDTO extends PersonDTO implements Academic {
  public readonly workerID: string;

  /**
   * Creates a new instance of AcademicDTO.
   * @param configuration - The configuration object containing academic details.
   */
  public constructor(configuration: Academic) {
    super(configuration);
    this.workerID = configuration.workerID;
  }

  public equals(other: Academic): boolean {
    return (
      super.equals(other) &&
      this.workerID === other.workerID
    );
  }
}