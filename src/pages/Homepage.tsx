import { Button, Container, Group, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import HeroSection from '../components/Herosection';

function Homepage() {
  return (
    <>
      <HeroSection />
      <Container>
        <Title mt="md" ta="center" order={2}>
          Choose difficulty!
        </Title>

        <Group mt="lg" position="center">
          <Link to="/quiz/easy">
            <Button>Easy</Button>
          </Link>
          <Link to="/quiz/medium">
            <Button>Medium</Button>
          </Link>
          <Link to="/quiz/hard">
            <Button>Hard</Button>
          </Link>
        </Group>
      </Container>
    </>
  );
}

export default Homepage;
