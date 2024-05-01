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
      <table className="border-collapse">
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr className="border-y-2 border-gray-800" key={i}>
              {Array.from({ length: cols }).map((_, j) => (
                <td key={j}>{tableData[i][j]}</td>
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
