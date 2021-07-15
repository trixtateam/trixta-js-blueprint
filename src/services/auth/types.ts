export interface AuthState {
  token?: string | null;
  isAuthenticated?: boolean;
  domain?: string | null;
  expires?: number;
  agentId?: string;
  roles: Array<{ name: string }>;
}

export interface Token {
  exp: number;
  agent_id?: string;
}
