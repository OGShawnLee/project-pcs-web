import { useCatch } from "$lib/Common";
import type { InferOutput } from "valibot";
import {
  date,
  email,
  integer,
  maxLength,
  minLength,
  nullish,
  number,
  object,
  parse,
  picklist,
  pipe,
  regex,
  string,
  transform,
  trim,
  union,
} from "valibot";
import { AcademicRole, AccountRole } from "@business/dto/enum";

export type Account = InferOutput<typeof Schema.ACCOUNT_SCHEMA>;
export type Person = InferOutput<typeof Schema.PERSON_SCHEMA>;
export type Academic = InferOutput<typeof Schema.ACADEMIC_SCHEMA>;
export type CurrentUser = InferOutput<typeof Schema.CURRENT_USER_SCHEMA>;
export type SignInShape = InferOutput<typeof Schema.SIGN_IN_SCHEMA>;
export type SignUpShape = InferOutput<typeof Schema.SIGN_UP_SCHEMA>;

export default class Schema {
  public static EMAIL_SCHEMA = pipe(
    string("Correo Electrónico debe ser una cadena de texto."),
    trim(),
    email("Correo Electrónico debe ser un correo electrónico válido."),
    minLength(3, "Correo Electrónico debe tener al menos 3 caracteres."),
    maxLength(128, "Correo Electrónico no debe exceder 128 caracteres.")
  );
  // Strong Password = Characters, Numbers, 8-128 characters, One Uppercase and One Lowercase
  public static STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$])[A-Za-z\d@$]{8,128}$/;
  public static NAME_SCHEMA = pipe(
    string("Nombre debe ser una cadena de texto."),
    trim(),
    minLength(3, "Nombre debe tener al menos 3 caracteres."),
    maxLength(64, "Nombre no debe exceder 64 caracteres.")
  );
  public static PHONE_NUMBER_REGEX = /^[0-9]{10,15}$/;
  public static WORKER_ID_REGEX = /(?!0+$)[0-9]{1,5}/;
  public static ACCOUNT_SCHEMA = object({
    email: this.EMAIL_SCHEMA,
    name: this.NAME_SCHEMA,
    password: pipe(
      string("Contraseña debe ser una cadena de texto."),
      trim(),
      minLength(8, "Contraseña debe tener al menos 8 caracteres."),
      maxLength(128, "Contraseña no debe exceder 128 caracteres.")
    ),
    refreshTokenVersion: pipe(
      number("Versión de Token de Actualización debe ser un número."),
      integer("Versión de Token de Actualización debe ser un número entero.")
    ),
    role: picklist(Object.values(AccountRole))
  });
  public static SIGN_IN_SCHEMA = object({
    email: this.EMAIL_SCHEMA,
    password: pipe(
      string("Contraseña debe ser una cadena de texto."),
      trim(),
      regex(
        this.STRONG_PASSWORD_REGEX,
        "Contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números."
      ),
      minLength(8, "Contraseña debe tener al menos 8 caracteres."),
      maxLength(128, "Contraseña no debe exceder 128 caracteres.")
    ),
  });
  public static SIGN_UP_SCHEMA = object({
    ...this.SIGN_IN_SCHEMA.entries,
    name: this.NAME_SCHEMA,
    confirmPassword: pipe(
      string("Confirmación de Contraseña debe ser una cadena de texto."),
      trim(),
      minLength(8, "Confirmación de Contraseña debe tener al menos 8 caracteres."),
      maxLength(128, "Confirmación de Contraseña no debe exceder 128 caracteres.")
    )
  });
  public static CURRENT_USER_SCHEMA = object({ id: this.EMAIL_SCHEMA });
  public static PERSON_SCHEMA = object({
    name: this.NAME_SCHEMA,
    lastName: pipe(
      string("Apellido debe ser una cadena de texto"),
      trim(),
      minLength(3, "Apellido debe tener al menos 3 caracteres."),
      maxLength(64, "Apellido no debe exceder 64 caracteres.")
    ),
    email: this.EMAIL_SCHEMA,
    phoneNumber: pipe(
      string("Número de Teléfono debe ser una cadena de texto."),
      trim(),
      regex(
        this.PHONE_NUMBER_REGEX,
        "Número de Teléfono debe ser una cadena de texto de 10 a 15 dígitos."
      )
    ),
    createdAt: nullish(
      pipe(
        union([string(), date()], "Fecha de Creación debe ser una cadena de texto o una fecha."),
        transform(value => typeof value === "string" ? new Date(value) : value),
        date("Fecha de Creación debe ser una fecha válida."),
      )
    )
  });
  public static ACADEMIC_SCHEMA = object({
    ...this.PERSON_SCHEMA.entries,
    role: picklist(Object.values(AcademicRole)),
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

  public static getValidAccount(data: unknown): Account {
    return parse(this.ACCOUNT_SCHEMA, data);
  }

  public static getSafeValidAccount(data: unknown) {
    return useCatch(() => this.getValidAccount(data));
  }

  public static getValidCurrentUser(data: unknown): CurrentUser {
    return parse(this.CURRENT_USER_SCHEMA, data);
  }

  public static getSafeValidCurrentUser(data: unknown) {
    return useCatch(() => this.getValidCurrentUser(data));
  }

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
