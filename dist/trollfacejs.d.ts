declare type TrollFace = {
    start: () => void;
    stop: () => void;
};
declare global {
    interface Window {
        trollfacejs: TrollFace;
    }
}
export {};
