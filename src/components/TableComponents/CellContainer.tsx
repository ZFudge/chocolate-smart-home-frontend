import { Flex } from '@mantine/core';
import appClasses from '@/App.module.css';

const CellContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        borderRadius: '0.25rem',
        padding: '0.25rem',
      }}
      className={appClasses['theme-match']}
    >
      {children}
    </Flex>
  );
};

export default CellContainer;
