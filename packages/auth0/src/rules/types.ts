export interface RuleUser {
  email?: string | undefined;
  username?: string | undefined;
  email_verified?: boolean | undefined;
  verify_email?: boolean | undefined;
  user_id?: string | undefined;
  blocked?: boolean | undefined;
  nickname?: string | undefined;
  picture?: string | undefined;
  password?: string | undefined;
  phone_number?: string | undefined;
  phone_verified?: boolean | undefined;
  given_name?: string | undefined;
  family_name?: string | undefined;
  name?: string | undefined;
  identities: IdentityProvider[] | undefined;
}

type IdentityProvider = {
  provider: string;
  user_id: string;
  connection: string;
  isSocial: boolean;
};

export interface RuleContext<A, I> {
  clientID: string;
  accessToken: {
    scope: string | string[];
  } & A;

  idToken: I;
}

export interface Rule {
  code: string;
  filename: string;
}
