import {
  ActionIcon,
  Box,
  Button,
  Container,
  Overlay,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: "100dvh",
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(70),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

function HeroSection() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleRandomDifficulty = () => {
    const difficulties = ["easy", "medium", "hard"];
    const randomDifficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];
    navigate(`/quiz/${randomDifficulty}`);
  };

  return (
    <Box className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>Quizical Notes</Title>
        <Text className={classes.description} size="xl" mt="xl">
          A quiz app made for music lovers. Test your knowledge, master every
          difficulty? Put your music skills to the test!
        </Text>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Button
            variant="gradient"
            size="md"
            radius="xl"
            className={classes.control}
            onClick={handleRandomDifficulty}
          >
            Random Difficulty
          </Button>
          <ActionIcon
            color="indigo"
            size="xl"
            radius="xl"
            variant="filled"
            aria-label="Go to main content"
            className={classes.control}
            onClick={() =>
              window.scrollTo({
                top: document.getElementById("mainContent")!.offsetTop,
                behavior: "smooth",
              })
            }
          >
            <FaArrowAltCircleDown size={30} />
          </ActionIcon>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
