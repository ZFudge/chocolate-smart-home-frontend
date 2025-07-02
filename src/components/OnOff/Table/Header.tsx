import { Checkbox, Table } from '@mantine/core';
import { FaPowerOff } from 'react-icons/fa';
import { OnOffObject } from '../interfaces';

interface HeaderProps {
  devices: OnOffObject[];
  selection: number[];
  toggleAll: () => void;
}

const Header = ({ devices, selection, toggleAll }: HeaderProps) => {
  return (
    <>
      <Table.Tr style={{ height: '3rem' }}>
        <Table.Th w={40}>
          <Checkbox
            onChange={toggleAll}
            checked={selection.length === devices.length}
            indeterminate={selection.length > 0 && selection.length !== devices.length}
            data-testid="toggle-all-checkbox"
          />
        </Table.Th>
        <Table.Th w={30}/>
        <Table.Th w={30}/>
        <Table.Th key="device-names-header" style={{ textAlign: 'center' }}>
          <FaPowerOff /> On / Off Devices
        </Table.Th>
      </Table.Tr>
    </>
  );
};

export default Header;
