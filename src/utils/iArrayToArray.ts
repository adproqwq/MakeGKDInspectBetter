import { IArray } from '@gkd-kit/api';

export default <T>(array: IArray<T> = []): T[] => {
  return Array<T>().concat(array);
};