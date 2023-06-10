import { Button, Container, Group, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import HeroSection from '../components/Herosection';

function Homepage() {
  return (
    <>
      <HeroSection />
      <Container>
        <Title
          variant="gradient"
          gradient={{ from: 'indigo', to: 'dark', deg: 45 }}
          mt="md"
          ta="center"
          order={2}
        >
          Choose difficulty!
        </Title>

        <Group mt="lg" position="center">
          <Link to="/quiz/easy">
            <Button color="teal">Easy</Button>
          </Link>
          <Link to="/quiz/medium">
            <Button color="grape">Medium</Button>
          </Link>
          <Link to="/quiz/hard">
            <Button color="violet">Hard</Button>
          </Link>
        </Group>
      </Container>
    </>
  );
}

export default Homepage;
