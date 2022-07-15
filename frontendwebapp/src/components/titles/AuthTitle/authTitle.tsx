import * as React from 'react';

interface IAuthTitleProps {
    text?: string;
    textSize?: string;
}

const AuthTitle: React.FunctionComponent<IAuthTitleProps> = (props) => {
    return (
        <div className={`${props.textSize} font-bold tracking-wide`}>{props.text}</div>
    );
};
AuthTitle.defaultProps = {
    text: '',
    textSize: 'text-5xl'
}
export default AuthTitle;
