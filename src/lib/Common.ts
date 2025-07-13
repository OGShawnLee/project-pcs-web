export type Result<Data, Error> = { data: Data, status: "Success" } | { error: Error, status: "Failure" };

export class UserDisplayableException extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "UserDisplayableException";
  }
}

export function useCatch<Data>(fn: () => Data): Result<Data, UserDisplayableException> {
  try {
    const data = fn();
    return { data, status: "Success" };
  } catch (error) {
    if (error instanceof UserDisplayableException) {
      return { error, status: "Failure" };
    }

    return { error: new UserDisplayableException("Ha ocurrido un error inesperado."), status: "Failure" };
  }
}