/** Central place to add/remove roles — every guard and component reads from here. */
export type Role = "admin" | "editor" | "member" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
