/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthEffects } from '@auth';
import { UsersEffects } from '@users';

export const effects: any[] = [UsersEffects, AuthEffects];
