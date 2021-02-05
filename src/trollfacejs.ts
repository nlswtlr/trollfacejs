import fetchTrollface from './lib/fetchTrollface';
import determainSlideDir from './lib/determainSlideDir';
import { TrollFace, StyleProps, SlideDir } from './types';
declare global {
  interface Window {
    trollfacejs: TrollFace;
  }
}

const TrollFaceJS = () => {
  let animationFrameRef: number = null;
  let trollfaceRef: HTMLOrSVGImageElement = null;
  let trollfaceSvgAsString: string = null;

  fetchTrollface()
    .then((face) => {
      trollfaceSvgAsString = face;
    })
    .catch((err) => console.error(err));

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
      console.error('could not find that body - wtf?!');
    }

    if (document.querySelector('#thetrollface')) {
      console.error('trollface is already attached!');
    }

    if (!trollfaceSvgAsString) {
      console.error('trollface was not fetch yet - lulz');
    }

    body.insertAdjacentHTML('beforeend', trollfaceSvgAsString);
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
