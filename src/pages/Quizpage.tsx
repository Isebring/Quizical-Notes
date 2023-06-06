import { Box } from '@mantine/core';
import { useParams } from 'react-router-dom';
import EasyMusicQuiz from '../components/EasyMusicQuiz';
import MediumMusicQuiz from '../components/MediumMusicQuiz';

function Quizpage() {
  const { difficulty } = useParams();

  if (difficulty === 'easy') {
    return <EasyMusicQuiz />;
  } else if (difficulty === 'medium') {
    return <MediumMusicQuiz />;
  } else {
    // Render HardMusicQuiz when it's created
    return <Box>Hard quiz not implemented yet</Box>;
  }
}

export default Quizpage;
