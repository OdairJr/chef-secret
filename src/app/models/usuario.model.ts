export interface Usuario {
  id?: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  is_admin: boolean;
  updated_at?: string;
  created_at?: string;
}
