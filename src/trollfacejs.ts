import trollface from './assets/trollface';

type TrollFace = {
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    trollfacejs: TrollFace;
  }
}

type StyleProps = {
  position?: string;
  left?: number;
  bottom?: number;
  transform?: {
    translate3d: {
      x: number;
      y: number;
    };
  };
  opacity?: number;
};

type SlideDir = 'right' | 'left';

const determainSlideDir = (currentDir: SlideDir, leftOffset: number): SlideDir => {
  if (currentDir === 'right' && leftOffset >= window.innerWidth) {
    return 'left';
  } else if (currentDir === 'left' && leftOffset <= 200) {
    return 'right';
  }
  return currentDir;
};

const TrollFaceJS = () => {
  let animationFrameRef: number = null;
  let trollfaceRef: HTMLOrSVGImageElement = null;

  const animate = () => {
    const stylesBaseValues: StyleProps = {
      position: 'fixed',
      left: 0,
      bottom: 0,
      transform: {
        translate3d: {
          x: 0,
          y: 50,
        },
      },
      opacity: 1,
    };
    let prevStyles: StyleProps = null;
    let slideDir: SlideDir = 'right';

    // for the first run
    if (!prevStyles) {
      prevStyles = stylesBaseValues;
    }

    const setPosition = () => {
      const tfRect = trollfaceRef.getBoundingClientRect();
      const leftOffset = prevStyles.transform.translate3d.x + tfRect.width;

      const newSlideDir = determainSlideDir(slideDir, leftOffset);
      slideDir = newSlideDir;

      const translateXVal =
        slideDir === 'left' ? prevStyles.transform.translate3d.x - 18 : prevStyles.transform.translate3d.x + 18;

      stylesBaseValues.transform.translate3d.x = translateXVal;

      const styles = {
        position: `${stylesBaseValues.position}`,
        left: `${stylesBaseValues.left}px`,
        bottom: `${stylesBaseValues.bottom}`,
        transform: `translate3d(${stylesBaseValues.transform.translate3d.x}px,${stylesBaseValues.transform.translate3d.y}%,0)`,
        opacity: `${stylesBaseValues.opacity}`,
      };

      for (const styleProp in styles) {
        trollfaceRef.style[styleProp] = styles[styleProp];
      }

      prevStyles = stylesBaseValues;
      animationFrameRef = requestAnimationFrame(setPosition);
    };

    animationFrameRef = requestAnimationFrame(setPosition);
  };

  const attachFace = () => {
    const body = document.querySelector('body');

    if (!body) {
      throw new Error('could not find that body - wtf?!');
    }

    if (document.querySelector('#thetrollface')) {
      throw new Error('trollface is already attached!');
    }

    body.insertAdjacentHTML('beforeend', trollface);
    trollfaceRef = document.querySelector('#thetrollface');

    animate();
  };

  const killFace = () => {
    cancelAnimationFrame(animationFrameRef);
    trollfaceRef.remove();
  };

  return {
    start: () => {
      attachFace();
    },
    stop: () => {
      killFace();
    },
  };
};

if (typeof window !== 'undefined') {
  window.trollfacejs = TrollFaceJS();
}

export {};
