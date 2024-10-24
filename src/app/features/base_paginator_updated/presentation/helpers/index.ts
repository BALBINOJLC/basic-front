import { IBase } from '../../domain';

export const cleanBaseUpdate = (base: IBase): IBase => {
  return {
    ...base,
    id: undefined,
  };
};
