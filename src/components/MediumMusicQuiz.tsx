import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Loader,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import axios from 'axios';
import he from 'he';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function MediumMusicQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false);
  const [fetchingQuestions, setFetchingQuestions] = useState<boolean>(false);
  const [questionsFetched, setQuestionsFetched] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRandomDifficulty = () => {
    const difficulties = ['easy', 'medium', 'hard'];
    const randomDifficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];
    navigate(`/quiz/${randomDifficulty}`);
  };

  useEffect(() => {
    if (!questionsFetched) {
      fetchQuestions();
    }
  }, [questionsFetched]);

  const fetchQuestions = async () => {
    setFetchingQuestions(true);
    try {
      const response = await axios.get(
        'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple'
      );
      setQuestions(response.data.results);
      setLoading(false);
      setFetchingQuestions(false);
      setQuestionsFetched(true);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
      setFetchingQuestions(false);
    }
  };

  const handleRestart = () => {
    setQuestionsFetched(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnsweredCorrectly(false);
  };
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (
      !answeredCorrectly &&
      answer === questions[currentQuestionIndex].correct_answer
    ) {
      setScore(score + 1);
      setAnsweredCorrectly(true);
    }
  };

  const moveToNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setAnsweredCorrectly(false);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
        <Box mt="lg" ta="center">
          <Card shadow="md" sx={{ background: '#56ADD3' }}>
            <Loader size="xl" />
            <Text color="white" ta="center">
              Loading Questions...
            </Text>
          </Card>
        </Box>
      </Flex>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex >= questions.length) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
        <Container>
          <Card shadow="md">
            <Title order={3} ta="center">
              Quiz Completed!
            </Title>
            <Text size="md" fw="bold">
              Your score is: {score} / {questions.length}
            </Text>
            <Text mt="sm" mb="sm" ta="center">
              Up for another round? Choose difficulty below{' '}
            </Text>
            <Group mt="md" position="right">
              <Link to="/medium">
                <Button onClick={handleRestart} color="teal">
                  Medium
                </Button>
              </Link>
              <Button
                variant="gradient"
                radius="sm"
                onClick={handleRandomDifficulty}
              >
                Random
              </Button>
            </Group>
          </Card>
        </Container>
      </Flex>
    );
  }

  const shuffledAnswers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Container>
        <Paper p="xl" shadow="xs">
          <Text size="xl" weight={700}>
            {he.decode(currentQuestion.question)}
          </Text>

          {shuffledAnswers.map((answer, index) => (
            <Box key={index}>
              <Button
                mt="sm"
                fullWidth
                onClick={() => handleAnswerClick(answer)}
                color={
                  selectedAnswer
                    ? answer === questions[currentQuestionIndex].correct_answer
                      ? 'teal'
                      : answer === selectedAnswer
                      ? 'red'
                      : 'gray'
                    : 'gray'
                }
                disabled={selectedAnswer ? answer !== selectedAnswer : false}
              >
                {he.decode(answer)}
              </Button>
              {selectedAnswer === answer && (
                <Text ta="center">
                  {answer === questions[currentQuestionIndex].correct_answer
                    ? 'Correct!'
                    : 'Incorrect!'}
                </Text>
              )}
            </Box>
          ))}

          {selectedAnswer !== null && (
            <Box>
              <Button
                mt="md"
                fullWidth
                color="indigo"
                onClick={moveToNextQuestion}
              >
                {currentQuestionIndex < questions.length - 1
                  ? 'Next question'
                  : 'Finish quiz'}
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Flex>
  );
}

export default MediumMusicQuiz;
