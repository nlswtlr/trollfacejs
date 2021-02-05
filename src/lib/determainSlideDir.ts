import { SlideDir } from '../types';

const determainSlideDir = (currentDir: SlideDir, leftOffset: number): SlideDir => {
  if (currentDir === 'right' && leftOffset >= window.innerWidth) {
    return 'left';
  } else if (currentDir === 'left' && leftOffset <= 200) {
    return 'right';
  }
  return currentDir;
};

export default determainSlideDir;
