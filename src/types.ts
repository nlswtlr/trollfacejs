export type TrollFace = {
  start: () => void;
  stop: () => void;
};

export type StyleProps = {
  position: string;
  left: number;
  bottom: number;
  transform: {
    translate3d: {
      x: number;
      y: number;
    };
  };
  opacity: number;
};

export type SlideDir = 'right' | 'left';
