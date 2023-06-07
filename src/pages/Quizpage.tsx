import { useParams } from 'react-router-dom';
import EasyMusicQuiz from '../components/EasyMusicQuiz';
import HardMusicQuiz from '../components/HardMusicQuiz';
import MediumMusicQuiz from '../components/MediumMusicQuiz';

function Quizpage() {
  const { difficulty } = useParams();

  if (difficulty === 'easy') {
    return <EasyMusicQuiz />;
  } else if (difficulty === 'medium') {
    return <MediumMusicQuiz />;
  } else {
    return <HardMusicQuiz />;
  }
}

export default Quizpage;
