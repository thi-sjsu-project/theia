import type { Message } from 'src/types/schema-types';

type SelectorProps = {
  message: Message;
};

/**
 * @description ???
 * @param ???
 * @returns ???
 */
const useSelector = ({ message }: SelectorProps) => {
  console.log('useSelector');
};

export default useSelector;
