import { Box, Button, Container, Flex, Paper, Text } from '@mantine/core';
import axios from 'axios';
import he from 'he';
import { useEffect, useState } from 'react';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function MusicQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple'
        );
        console.log(response);
        setQuestions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (loading) {
    return (
      <Text color="white" align="center" ta="center">
        Loading questions...
      </Text>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex >= questions.length) {
    return (
      <Container>
        <Text ta="center">
          Quiz Completed! Your score: {score} / {questions.length}
        </Text>
      </Container>
    );
  }

  const shuffledAnswers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <Flex align="center">
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
                onClick={() =>
                  handleAnswerClick(answer === currentQuestion.correct_answer)
                }
              >
                {he.decode(answer)}
              </Button>
            </Box>
          ))}
        </Paper>
      </Container>
    </Flex>
  );
}

export default MusicQuiz;
