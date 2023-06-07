import {
  Box,
  Button,
  Container,
  Flex,
  Loader,
  Paper,
  Text,
} from '@mantine/core';
import axios from 'axios';
import he from 'he';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          'https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple'
        );
        setQuestions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
  };

  const moveToNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
  };

  if (loading) {
    return (
      <Box mt="lg" ta="center">
        <Loader size="xl" />
        <Text ta="center">Loading Questions...</Text>
      </Box>
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
