export interface TokenPayload {
  _id: string;
  email: string;
  username: string;
  name: string;
  emailVerified: Date | null;
}
