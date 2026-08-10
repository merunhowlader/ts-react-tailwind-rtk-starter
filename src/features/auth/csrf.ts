/**
 * CSRF token lives in memory only — never localStorage/sessionStorage.
 * It resets on page refresh, which is fine: the initial /auth/me or
 * /auth/refresh call on app load re-issues it.
 */
let csrfToken: string | null = null;

export const setCsrfToken = (token: string): void => {
  csrfToken = token;
};

export const getCsrfToken = (): string | null => csrfToken;

export const clearCsrfToken = (): void => {
  csrfToken = null;
};
