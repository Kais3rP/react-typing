import { FC, SetStateAction, Dispatch } from 'react';
import { IText } from 'types/types';
interface IProps {
    isLast: boolean;
    handleEndOfTyping: () => void;
    nextDelay: number;
    repeatDelay: number;
    setIsEnded: Dispatch<SetStateAction<boolean>>;
    children?: JSX.Element | string;
}
declare const TextTyping: FC<IProps & IText>;
export default TextTyping;
//# sourceMappingURL=TextType.d.ts.map