import type { ReactNode } from 'react';
import type { TableElement as TableElementType } from 'src/types/element';

type TableElementProps = {
  element: TableElementType;
  // children for nested elements that Tom mentioned.
  children?: ReactNode;
  // and more props to perhaps control position of the children
};

const TableElement = ({ element, children }: TableElementProps) => {
  const { rows, cols, tableData } = element;

  const renderTable = () => {
    return (
      <table className="border-collapse w-full border-spacing-14">
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr className={`border-y-2 border-[#585864] ${i % 2 === 0 && 'bg-[#202021]'}`} key={i}>
              {Array.from({ length: cols }).map((_, j) => (
                <td key={j} className={`${j > 0 ? 'border-l-2' : 'border-x-0'} ${j === 0 && 'text-[#bcbcbc]'} border-[#585864] py-1`}>
                  <div className='ml-4'>
                  {tableData[i][j]}
                  </div>
                  </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div id={element.id}>
      {renderTable()}
      {children}
    </div>
  );
};

export default TableElement;
