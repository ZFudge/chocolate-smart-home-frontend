import { HiStatusOffline, HiStatusOnline, HiTag } from 'react-icons/hi';
import { Flex, Text } from '@mantine/core';
import { TooltipWrapper } from '@/components';
import { OnOffObject } from '../interfaces';

const DeviceCell = ({ device }: { device: OnOffObject }) => {
  const Icon = device.online ? HiStatusOnline : HiStatusOffline;

  return (
    <Flex columnGap={5} justify="flex-end" align="center" direction="row">
      <TooltipWrapper label={device.tags?.map((tag) => tag.name).join(', ') || null}>
        <HiTag />
      </TooltipWrapper>
      <TooltipWrapper label={`last seen ${device.last_seen}`}>
        <Icon style={{ color: device.online ? 'gray' : 'red' }} />
      </TooltipWrapper>
      <Text ta="right">{device.name}</Text>
    </Flex>
  );
};

export default DeviceCell;
