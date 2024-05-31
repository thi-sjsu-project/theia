import type { TableElement as TableElementType } from 'src/types/element';
import type { Message } from 'src/types/schema-types';
import TableElement from 'src/components/Element/Simple/TableElement';
import { capitalizeFirstLetter as cfl } from 'src/utils/helpers';

const getTableContent = (message: Message) => {
  const content = {
    title: 'N/A',
    header: 'N/A',
    description: 'N/A',
  };

  switch (message.kind) {
    case 'ThreatDetected':
      content.title = `ACA-${message.data.detectedByAca}`;
      content.header = 'Threat Detected';
      content.description = '';
      break;
    case 'RequestApprovalToAttack':
      content.title = `ACA`;
      content.header = 'Request to attack';
      content.description = `Approval for ${message.data.attackWeapon.type} attack`;
      break;
    default:
      break;
  }

  return content;
};

type HistoryElementProps = {
  message: Message;
  index: number;
  outerDivStyleClass?: string;
};

const HistoryElement = ({
  message,
  index,
  outerDivStyleClass,
}: HistoryElementProps) => {
  const className = outerDivStyleClass;
  const { title, header, description } = getTableContent(message);

  const renderTable = () => {
    switch (message.kind) {
      case 'RequestApprovalToAttack': {
        const tableData = [
          ['Priority', message.priority.toString()],
          ['Collatoral Damage', message.data.collateralDamage],
        ];

        const element: TableElementType = {
          id: `table:${index}_${message.id}`,
          type: 'table',
          modality: 'visual',
          h: tableData.length,
          w: tableData[0].length,
          tableData,
        };

        return <TableElement element={element} />;
      }

      case 'ThreatDetected': {
        const tableData = [
          ['Location', message.data.target.location.toString()],
          ['Priority', message.priority.toString()],
        ];

        const element: TableElementType = {
          id: `table:${index}_${message.id}`,
          type: 'table',
          modality: 'visual',
          h: tableData.length,
          w: tableData[0].length,
          tableData,
        };

        return <TableElement element={element} />;
      }

      default:
        return null;
    }
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-6">
        <div className="col-span-2 flex flex-col gap-5">
          <div className="font-semibold leading-8" style={{ fontSize: 28 }}>
            <span className="text-muted-gray">{title}</span>
            <br />
            {header}
          </div>
          <div className="font-normal" style={{ fontSize: 24 }}>
            {description}
          </div>
        </div>

        <div className="col-span-4 w-full">{renderTable()}</div>
      </div>
    </div>
  );
};

export default HistoryElement;
