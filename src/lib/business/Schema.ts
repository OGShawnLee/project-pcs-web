import { useCatch } from "$lib/Common";
import type { InferOutput } from "valibot";
import {
  email,
  maxLength,
  minLength,
  object,
  parse,
  pipe,
  regex,
  string,
  trim,
} from "valibot";

export type Person = InferOutput<typeof Schema.PERSON_SCHEMA>;
export type Academic = InferOutput<typeof Schema.ACADEMIC_SCHEMA>;

export default class Schema {
  public static WORKER_ID_REGEX = /(?!0+$)[0-9]{1,5}/g;
  public static PHONE_NUMBER_REGEX = /^[0-9]{10,15}$/;
  public static PERSON_SCHEMA = object({
    name: pipe(
      string("Nombre debe ser una cadena de texto."),
      trim(),
      minLength(3, "Nombre debe tener al menos 3 caracteres."),
      maxLength(64, "Nombre no debe exceder 64 caracteres.")
    ),
    lastName: pipe(
      string("Apellido debe ser una cadena de texto"),
      trim(),
      minLength(3, "Apellido debe tener al menos 3 caracteres."),
      maxLength(64, "Apellido no debe exceder 64 caracteres.")
    ),
    email: pipe(
      string("Correo Electrónico debe ser una cadena de texto."),
      trim(),
      email("Correo Electrónico debe ser un correo electrónico válido."),
      minLength(3, "Correo Electrónico debe tener al menos 3 caracteres."),
      maxLength(128, "Correo Electrónico no debe exceder 128 caracteres.")
    ),
    phoneNumber: pipe(
      string("Número de Teléfono debe ser una cadena de texto."),
      trim(),
      regex(
        this.PHONE_NUMBER_REGEX,
        "Número de Teléfono debe ser una cadena de texto de 10 a 15 dígitos."
      )
    ),
  });
  public static ACADEMIC_SCHEMA = object({
    ...this.PERSON_SCHEMA.entries,
    workerID: pipe(
      string("ID de Trabajador debe ser una cadena de texto."),
      trim(),
      regex(
        this.WORKER_ID_REGEX,
        "ID de Trabajador debe ser una cadena de texto de 1 a 5 dígitos, no puede ser cero o contener solo ceros."
      ),
      minLength(1, "ID de Trabajador debe tener al menos 1 caracteres."),
      maxLength(5, "ID de Trabajador no debe exceder 5 caracteres.")
    ),
  });

  public static getValidPerson(data: unknown): Person {
    return parse(this.PERSON_SCHEMA, data);
  }

  public static getSafeValidPerson(data: unknown) {
    return useCatch(() => this.getValidPerson(data));
  }

  public static getValidAcademic(data: unknown): Academic {
    return parse(this.ACADEMIC_SCHEMA, data);
  }

  public static getSafeValidAcademic(data: unknown) {
    return useCatch(() => this.getValidAcademic(data));
  }
}
