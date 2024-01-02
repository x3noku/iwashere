import cn from 'classnames';
import { type FC } from 'react';
import { type PropsOf } from '~/shared/lib';

interface InputAuthProps extends PropsOf<'input'> {}

export const InputAuth: FC<InputAuthProps> = ({ className, ...props }) => {
    return (
        <div>
            <input
                {...props}
                className={cn(
                    'solid border-b border-b-border-authorization bg-transparent pb-1 pl-3 text-12 font-400 text-text-authorization',
                    className
                )}
                autoComplete={'on'}
            />
        </div>
    );
};
