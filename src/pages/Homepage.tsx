import {
  Box,
  Button,
  Container,
  Group,
  MediaQuery,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import HeroSection from '../components/Herosection';

function Homepage() {
  return (
    <>
      <HeroSection />
      <Container ta="center" size="xl">
        <MediaQuery
          query="(max-width: 800px)"
          styles={{
            flexDirection: 'column',
          }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Title
                variant="gradient"
                gradient={{ from: 'white', to: 'indigo', deg: 35 }}
                mt="md"
                mb="xl"
                ta="center"
                order={1}
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
            </Box>

            <Box>
              <img
                style={{ height: '40%', width: '60%' }}
                src="/src/assets/imgs/happy-instruments.png"
                alt="Happy instruments playing music and singing"
              ></img>
            </Box>
          </Box>
        </MediaQuery>
      </Container>
    </>
  );
}

export default Homepage;
