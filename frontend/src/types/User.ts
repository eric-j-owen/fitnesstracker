export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  user_role: "basic" | "trainer";
  created_at: string;
  updated_at: string;
}
