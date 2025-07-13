import Schema, { type Person } from '@business/Schema';
import { UserDisplayableException } from '$lib/Common';
import { describe, it, expect, assert } from 'vitest';

describe('Schema Test', () => {
	const VALID_PERSON: Person = {
		name: "John",
		lastName: "Doe",
		email: "Doe@example.com",
		phoneNumber: "1234567890"
	};

	describe("Person Schema", () => {
		describe("getValidPerson", () => {
			it("Should return a valid Person", () => {
				const validated = Schema.getValidPerson(VALID_PERSON);
				expect(validated).toEqual(VALID_PERSON);
			});

			it("Should throw an error for invalid Person", () => {
				expect(() => Schema.getValidPerson({
					name: "Jo",
					lastName: "D",
					email: "invalid-email",
					phoneNumber: "123"
				})).toThrowError();
			});

			it("Should throw an error for invalid data type", () => {
				expect(() => Schema.getValidPerson("Invalid Data")).toThrowError();
			});

			it("Should throw an error for missing fields", () => {
				expect(() => Schema.getValidPerson({
					name: "John",
					lastName: "Doe"
				})).toThrowError();
			});

			it("Should throw an error for null data", () => {
				expect(() => Schema.getValidPerson(null)).toThrowError();
			});

			it("Should throw an error for undefined data", () => {
				expect(() => Schema.getValidPerson(undefined)).toThrowError();
			});

			it("Should throw an error for empty object", () => {
				expect(() => Schema.getValidPerson({})).toThrowError();
			});

			it("Should throw an error for invalid name", () => {
				expect(() => Schema.getValidPerson({
					name: "J",
					lastName: VALID_PERSON.lastName,
					email: VALID_PERSON.email,
					phoneNumber: VALID_PERSON.phoneNumber
				})).toThrowError();
			});

			it("Should throw an error for invalid lastName", () => {
				expect(() => Schema.getValidPerson({
					name: VALID_PERSON.name,
					lastName: "D",
					email: VALID_PERSON.email,
					phoneNumber: VALID_PERSON.phoneNumber
				})).toThrowError();
			});

			it("Should throw an error for invalid email", () => {
				expect(() => Schema.getValidPerson({
					name: VALID_PERSON.name,
					lastName: VALID_PERSON.lastName,
					email: "invalid-email",
					phoneNumber: VALID_PERSON.phoneNumber
				})).toThrowError();
			});

			it("Should throw an error for invalid phoneNumber", () => {
				expect(() => Schema.getValidPerson({
					name: VALID_PERSON.name,
					lastName: VALID_PERSON.lastName,
					email: VALID_PERSON.email,
					phoneNumber: "123"
				})).toThrowError();
			});
		});

		describe("getSafeValidPerson", () => {
			it("Should return a Result with data for valid Person", () => {
				const result = Schema.getSafeValidPerson(VALID_PERSON);

				assert(result.status === "Success");
				expect(result.status).toBe("Success");
				expect(result.data).toEqual(VALID_PERSON);
			});

			it("Should return a Result with UserDisplayableError for invalid Person", () => {
				const result = Schema.getSafeValidPerson({
					name: "Jo",
					lastName: "D",
					email: "invalid-email",
					phoneNumber: "123"
				});
				assert(result.status === "Failure");
				expect(result.status).toBe("Failure");
				expect(result.error).toBeInstanceOf(UserDisplayableException);
			});
		});
	});

	describe("Academic Schema", () => {
		const VALID_ACADEMIC = { ...VALID_PERSON, workerID: "12345" };

		describe("getValidAcademic", () => {
			it("Should return a valid Academic", () => {
				const validated = Schema.getValidAcademic(VALID_ACADEMIC);
				expect(validated).toEqual(VALID_ACADEMIC);
			});

			it("Should throw an error for invalid Academic", () => {
				expect(() => Schema.getValidAcademic({
					name: "Jo",
					lastName: "D",
					email: "invalid-email",
					phoneNumber: "1234567890",
					workerID: "123"
				})).toThrowError();
			});

			it("Should throw an error for missing workerID", () => {
				expect(() => Schema.getValidAcademic({
					name: VALID_PERSON.name,
					lastName: VALID_PERSON.lastName,
					email: VALID_PERSON.email,
					phoneNumber: VALID_PERSON.phoneNumber
				})).toThrowError();
			});

			it("Should throw an error for invalid workerID", () => {
				expect(() => Schema.getValidAcademic({
					name: VALID_PERSON.name,
					lastName: VALID_PERSON.lastName,
					email: VALID_PERSON.email,
					phoneNumber: VALID_PERSON.phoneNumber,
					workerID: "0"
				})).toThrowError();
			});

			it("Should throw an error for null data", () => {
				expect(() => Schema.getValidAcademic(null)).toThrowError();
			});

			it("Should throw an error for undefined data", () => {
				expect(() => Schema.getValidAcademic(undefined)).toThrowError();
			});

			it("Should throw an error for empty object", () => {
				expect(() => Schema.getValidAcademic({})).toThrowError();
			});

			it("Should throw an error for invalid name", () => {
				expect(() => Schema.getValidAcademic({
					name: "J",
					lastName: VALID_PERSON.lastName,
					email: VALID_PERSON.email,
					phoneNumber: VALID_PERSON.phoneNumber,
					workerID: "12345"
				})).toThrowError();
			});
			it("Should throw an error for invalid lastName", () => {
				expect(() => Schema.getValidAcademic({
					name: VALID_PERSON.name,
					lastName: "D",
					email: VALID_PERSON.email,
					phoneNumber: VALID_PERSON.phoneNumber,
					workerID: "12345"
				})).toThrowError();
			});

			it("Should throw an error for invalid email", () => {
				expect(() => Schema.getValidAcademic({
					name: VALID_PERSON.name,
					lastName: VALID_PERSON.lastName,
					email: "invalid-email",
					phoneNumber: VALID_PERSON.phoneNumber,
					workerID: "12345"
				})).toThrowError();
			});

			it("Should throw an error for invalid phoneNumber", () => {
				expect(() => Schema.getValidAcademic({
					name: VALID_PERSON.name,
					lastName: VALID_PERSON.lastName,
					email: VALID_PERSON.email,
					phoneNumber: "123",
					workerID: "12345"
				})).toThrowError();
			});

			it("Should throw an error for invalid workerID", () => {
				expect(() => Schema.getValidAcademic({
					name: VALID_PERSON.name,
					lastName: VALID_PERSON.lastName,
					email: VALID_PERSON.email,
					phoneNumber: VALID_PERSON.phoneNumber,
					workerID: "0"
				})).toThrowError();
			});

			it("Should throw an error for workerID with only zeros", () => {
				expect(() => Schema.getValidAcademic({
					name: VALID_PERSON.name,
					lastName: VALID_PERSON.lastName,
					email: VALID_PERSON.email,
					phoneNumber: VALID_PERSON.phoneNumber,
					workerID: "00000"
				})).toThrowError();
			});

			it("Should throw an error for workerID with more than 5 digits", () => {
				expect(() => Schema.getValidAcademic({
					name: VALID_PERSON.name,
					lastName: VALID_PERSON.lastName,
					email: VALID_PERSON.email,
					phoneNumber: VALID_PERSON.phoneNumber,
					workerID: "123456"
				})).toThrowError();
			});

			it("Should throw an error for workerID with less than 1 digit", () => {
				expect(() => Schema.getValidAcademic({
					name: VALID_PERSON.name,
					lastName: VALID_PERSON.lastName,
					email: VALID_PERSON.email,
					phoneNumber: VALID_PERSON.phoneNumber,
					workerID: "0"
				})).toThrowError();
			});
		});

		describe("getSafeValidAcademic", () => {
			it("Should return a Result with data for valid Academic", () => {
				const result = Schema.getSafeValidAcademic(VALID_ACADEMIC);

				assert(result.status === "Success");
				expect(result.status).toBe("Success");
				expect(result.data).toEqual(VALID_ACADEMIC);
			});

			it("Should return a Result with UserDisplayableError for invalid Academic", () => {
				const result = Schema.getSafeValidAcademic({
					name: "Jo",
					lastName: "D",
					email: "invalid-email",
					phoneNumber: "1234567890",
					workerID: "123"
				});
				assert(result.status === "Failure");
				expect(result.status).toBe("Failure");
				expect(result.error).toBeInstanceOf(UserDisplayableException);
			});
		});
	});
});

