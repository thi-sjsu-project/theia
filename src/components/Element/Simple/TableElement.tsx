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
  fontSize?: number;
};

const TableElement = ({
  element,
  children,
  borderColor = 'border-[#585864]',
  evenAlternatingColor = 'bg-[#202021]',
  oddAlternatingColor = 'bg-[rgba(0,0,0,0)]',
  leftLabelColor = 'text-[#bcbcbc]',
  fontSize = 24,
}: TableElementProps) => {
  const { tableData } = element;

  const rows = element.rows ?? tableData?.length;
  const cols = element.cols ?? tableData[0]?.length;

  const renderTable = () => {
    return (
      <table className="border-collapse w-full" style={{ fontSize }}>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr
              className={`border-y-2 ${borderColor} ${i % 2 === 0 ? evenAlternatingColor : oddAlternatingColor}`}
              key={i}
            >
              {Array.from({ length: cols }).map((_, j) => (
                <td
                  key={j}
                  className={`${j > 0 ? 'border-l-2' : 'border-x-0'} ${j === 0 && leftLabelColor} ${borderColor} py-1`}
                  style={{ width: `${100 / cols}%` }}
                >
                  <div className="ml-3">{tableData[i][j]}</div>
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
