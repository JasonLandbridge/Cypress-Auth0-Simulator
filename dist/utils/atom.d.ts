import type { Person, TestState } from '../types';
import type { Client, Simulation } from '@simulacrum/client';
export declare function getAtom(): import("@effection/atom").Slice<TestState>;
export declare function getAtomSlice(name: 'client' | 'simulation' | 'person'): Person | Client | Simulation | undefined;
export declare function getPersonAtomSlice(): Person;
export declare function getSimulationAtomSlice(): Simulation;
/**
 * Get the client from the spec. If it doesn't exist, create it and store it in the atom.
 * @param spec The spec name to get the client from
 */
export declare function getClientFromSpec(spec: string): Client;
