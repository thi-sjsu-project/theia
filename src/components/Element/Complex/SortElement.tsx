import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import type { Element } from 'src/types/element';
import { DEFAULT_SORT, sortFunctions } from 'src/utils/constants';
import type { SortElement as SortElementType } from 'src/types/element';
import SortToggle from 'src/ui/sort/SortToggle';
import { updateSortMethod } from 'src/redux/slices/communicationSlice';
import { findSortIndex } from 'src/scripts/sort/SortScripts';

type SortElementProps = {
  options: Element[];
};

const SortElement = ({ options }: SortElementProps) => {
  const gazesAndKeys = useAppSelector(getGazesAndKeys);
  const dispatch = useAppDispatch();

  const [sortMethodIndex, setSortMethodIndex] = useState<number>(
    findSortIndex(DEFAULT_SORT),
  );

  const updateMethodIndex = (index: number) =>
    setSortMethodIndex(index % sortFunctions.length);

  useEffect(() => {
    dispatch(updateSortMethod(sortFunctions[sortMethodIndex].name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMethodIndex]);

  useEffect(() => {
    // use f key for "filter"; option goes from left to right and wraps around
    if (gazesAndKeys.some((action) => action.keyPress === 'KeyF'))
      updateMethodIndex(sortMethodIndex + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gazesAndKeys]);

  return (
    <div className="text-white flex flex-row items-center justify-center h-full">
      {options.map((element, index) => {
        const el = element as SortElementType;
        return (
          <div className="h-full" id={el.id}>
            <SortToggle
              isActive={index === sortMethodIndex}
              name={el.sortType}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SortElement;
