import { Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Box>
      <main>
        <Outlet />
      </main>
    </Box>
  );
}

export default App;
