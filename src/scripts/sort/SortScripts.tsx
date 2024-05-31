import type { SortTypes } from 'src/types/sortMethod';
import { sortFunctions } from 'src/utils/constants';

export const findSortIndex = (sortName: SortTypes) => sortFunctions.findIndex(({ name }) => name === sortName);

export const getSortFunc = (sortName: SortTypes) => sortFunctions.filter((el) => el.name === sortName)[0].func;
