import { FC } from 'react';
export interface IProps {
    children?: JSX.Element | string;
    options: {
        language: string;
    };
    styleOptions: IStyleTheme;
    textContainer: HTMLElement;
}
declare const Component: FC<IProps>;
export default Component;
//# sourceMappingURL=index.d.ts.map