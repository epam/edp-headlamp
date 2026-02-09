import { v4 as uuidv4 } from 'uuid';

export const createRandomString = (stringLength: number = 5): string => {
  const uuid = uuidv4();

  const continuousUUID = uuid.replace(/-/g, '');

  return continuousUUID.slice(0, stringLength);
};
