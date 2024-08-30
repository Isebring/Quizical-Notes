import {
  Box,
  Button,
  Card,
  Container,
  Group,
  MediaQuery,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import happyInstruments from "../assets/imgs/happy-instruments.png";
import happyInstruments2 from "../assets/imgs/happy-instruments2.png";
import HeroSection from "../components/Herosection";

function Homepage() {
  return (
    <>
      <HeroSection />
      <Container id="mainContent" ta="center" size="xl">
        <MediaQuery
          query="(max-width: 800px)"
          styles={{
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Title
                sx={{ fontSize: "3.5rem" }}
                variant="gradient"
                gradient={{ from: "lightgrey", to: "black", deg: 545 }}
                mt="md"
                mb="xl"
                ta="center"
                fw={700}
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
              <img
                style={{ height: "40%", width: "50%" }}
                src={happyInstruments2}
                alt="Happy instruments playing music and singing"
              ></img>
            </Box>

            <Box>
              <img
                style={{ height: "40%", width: "40%" }}
                src={happyInstruments}
                alt="Happy instruments playing music and singing"
              ></img>
              <Card
                shadow="lg"
                sx={{ background: "#0a141895" }}
                mt="md"
                mb="lg"
              >
                <Text color="white" ta="left">
                  Quizical notes comes with three difficulties: Easy, Medium and
                  Hard. Once every turn is done, you can choose to retry that
                  same difficulty or choose a random difficulty. 🎵🎶{" "}
                </Text>
              </Card>
            </Box>
          </Box>
        </MediaQuery>
      </Container>
    </>
  );
}

export default Homepage;
