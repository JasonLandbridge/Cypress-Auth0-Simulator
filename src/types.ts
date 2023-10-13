import type { AuthOptions } from 'auth0-js';
import type { Client, Simulation } from '@simulacrum/client';
import { Auth0Result } from 'auth0-js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      createSimulation(options?: CreateSimulation): Chainable<Subject>;

      destroySimulation(): Chainable<Subject>;

      login(person?: Partial<Person>): Chainable<string>;

      logout(): Chainable<AUTWindow>;

      given(attrs?: Partial<Person>): Chainable<Person>;

      out<S = unknown>(msg: string): Chainable<S>;

      getUserInfo(accessToken: string): Chainable<Person>;

      getUserTokens(person: Person): Chainable<Auth0Result & { scope: string }>;

      task<T>(
        event: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args?: any,
        options?: Partial<Loggable & Timeoutable>,
      ): Chainable<T>;
    }
  }
}

export const enum Auth0SDK {
  Auth0JS = 'auth0-js',
  Auth0Vue = 'auth0-vue',
  Auth0React = 'auth0-react',
  Auth0NextJS = 'nextjs-auth0',
}

export type TestState = Record<
  string,
  {
    client: Client;
    simulation?: Simulation;
    person?: Person;
  }
>;

export type CreateSimulation = AuthOptions & { debug?: boolean };

export interface Person {
  email: string;
  password: string;
}

export type GetClientFromSpec = (spec: string) => Client;

export interface EncryptPayload {
  secret: string;
  audience: string;
  user: Person;
  idToken?: string;
  accessToken?: string;
  accessTokenScope: string;
  accessTokenExpiresAt: number;
  createdAt: number;
}
