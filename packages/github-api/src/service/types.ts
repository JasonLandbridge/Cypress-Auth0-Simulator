/* eslint-disable @typescript-eslint/ban-types */
import type { YogaNodeServerInstance } from '@graphql-yoga/node';
import type { IncomingMessage, ServerResponse } from 'http';
import type { YogaServerOptions } from '@graphql-yoga/common';
import type { GraphQLSchema } from 'graphql';
import type { GithubOrganization, GithubRepository, User } from '../types/graphql';

export type ServerInstance = YogaNodeServerInstance<
  {
    req: IncomingMessage;
    res: ServerResponse;
  },
  {},
  {}
>;

type ServerOptions = YogaServerOptions<
  {
    req: IncomingMessage;
    res: ServerResponse;
  },
  {},
  {}
>;

export type Resolvers<A = ServerOptions['schema']> = A extends GraphQLSchema
  ? never
  : A extends undefined
  ? never
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  : A extends { resolvers?: Record<string, any> }
  ? A['resolvers']
  : never;

export interface SimulatedData {
  users: Iterable<User>;
  githubRepositories: Iterable<GithubRepository>;
  githubOrganizations: Iterable<GithubOrganization>;
}
