import type { ReactNode } from 'react';
import type { TableElement as TableElementType } from 'src/types/element';

type TableElementProps = {
  element: TableElementType;
  // children for nested elements that Tom mentioned.
  children?: ReactNode;
  // and more props to perhaps control position of the children

  borderColor?: string;
  evenAlternatingColor?: string;
  oddAlternatingColor?: string;
  leftLabelColor?: string;
};

const TableElement = ({
  element,
  children,
  borderColor = '#585864',
  evenAlternatingColor = '#202021',
  oddAlternatingColor = '#00FFFFFF',
  leftLabelColor = '#bcbcbc',
}: TableElementProps) => {
  const { rows, cols, tableData } = element;

  const renderTable = () => {
    return (
      <table className="border-collapse border-spacing-14 w-full">
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr
              className={`border-y-2 border-[${borderColor}] bg-[${i % 2 === 0 ? evenAlternatingColor : oddAlternatingColor}] `}
              key={i}
            >
              {Array.from({ length: cols }).map((_, j) => (
                <td
                  key={j}
                  className={`${j > 0 ? 'border-l-2' : 'border-x-0'} ${j === 0 && `text-[${leftLabelColor}]`} border-[${borderColor}] py-1`}
                  style={{ width: `${100 / cols}%` }}
                >
                  <div className="ml-6">{tableData[i][j]}</div>
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
