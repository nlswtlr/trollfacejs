import { LSKEY } from '../config';

const fetchTrollface = async () => {
  try {
    const lsContent = window.localStorage.getItem(LSKEY);

    if (lsContent) {
      return lsContent;
    }

    const req = await fetch('https://raw.githubusercontent.com/nlswtlr/trollfacejs/master/src/assets/trollface.txt');
    const trollfaceSvgAsString = await req.text();

    window.localStorage.setItem(LSKEY, trollfaceSvgAsString);

    return trollfaceSvgAsString;
  } catch (err) {
    console.log(err);
  }
};

export default fetchTrollface;
