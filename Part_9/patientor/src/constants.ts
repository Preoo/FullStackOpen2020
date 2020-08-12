export const apiBaseUrl = 'http://localhost:3001/api';

// Helper functions
export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};