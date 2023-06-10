import {
  Box,
  Button,
  Container,
  Overlay,
  Text,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  container: {
    height: rem(700),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    zIndex: 1,
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      height: rem(500),
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

function HeroSection() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleRandomDifficulty = () => {
    const difficulties = ['easy', 'medium', 'hard'];
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
          A quiz app made for music lovers. Test your knowledge, challenge a
          friend, who will get the highest score?
        </Text>
        <Button
          variant="gradient"
          size="xl"
          radius="xl"
          className={classes.control}
          onClick={handleRandomDifficulty}
        >
          Random Difficulty
        </Button>
      </Container>
    </Box>
  );
}

export default HeroSection;
