import { PostgrestError } from "@supabase/supabase-js";
import { ValiError } from "valibot";

export type Result<Data, Error> = { data: Data, error: null, status: "Success" } | { data: null, error: Error, status: "Failure" };

export class UserDisplayableException extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "UserDisplayableException";
  }
}

export function isEmpty(value: string): boolean {
  return value.trim() === "";
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function useResult<Data>(data: Data | null, error: unknown) {
  if (isNullish(data)) {
    return { data: null, error: handleError(error), status: "Failure" } as Result<Data, UserDisplayableException>;
  }

  return { data, error: null, status: "Success" } as Result<Data, UserDisplayableException>;
}

function handleError(error: unknown): UserDisplayableException {  
  // TODO: Replace with a proper logging mechanism
  console.error(error);

  if (error instanceof UserDisplayableException) {
    return error;
  }

  if (error instanceof PostgrestError) {
    return new UserDisplayableException("Ha ocurrido un error en la base de datos, por favor, intente más tarde.");
  }

  if (error instanceof ValiError) {
    return new UserDisplayableException("Los datos recibidos no son válidos, no es su culpa. Este error ha sido reportado al equipo de desarrollo.");
  }

  return new UserDisplayableException("Ha ocurrido un error inesperado.");
}

export function useCatch<Data>(fn: () => Data | Result<Data, UserDisplayableException>): Result<Data, UserDisplayableException> {
  try {
    const data = fn();

    if (typeof data === "object" && data != null && "data" in data && "error" in data && "status" in data) {
      return data;
    }

    return { data, error: null, status: "Success" };
  } catch (error) {
    return { data: null, error: handleError(error), status: "Failure" };
  }
}

export async function useAwait<Data>(fn: () => Promise<Data | Result<Data, UserDisplayableException>>): Promise<Result<Data, UserDisplayableException>> {
  try {
    const data = await fn();

  if (typeof data === "object" && data != null && "data" in data && "error" in data && "status" in data) {
      return data;
    }

    return { data, error: null, status: "Success" };
  } catch (error) {
    return { data: null, error: handleError(error), status: "Failure" };
  }
}
