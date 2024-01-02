import cn from 'classnames';
import Image from 'next/image';
import React, { useId, type FC } from 'react';
import Krest from '~/shared/assets/svg/checkKrest.svg';
import { type EnumType } from '../../lib';

const InputType = {
    PAY: 'pay',
    SIZE: 'size',
} as const;

type InputRoundedProps = React.PropsWithChildren & {
    idForLabel?: string;
    className?: string;
    type: EnumType<typeof InputType>;
};

export const InputRounded: FC<InputRoundedProps> = ({ idForLabel, type = 'pay', children, className }) => {
    const id = idForLabel ?? useId();

    return (
        <label htmlFor={id} className={cn('relative flex cursor-pointer select-none items-center', className)}>
            {children}
            <input
                id={id}
                type={'checkbox'}
                className={cn(
                    'solid peer appearance-none border border-black',
                    type === 'pay' &&
                        'solid h-3 w-3 appearance-none rounded-50 border border-black bg-border-authorization',
                    type === 'size' && 'solid h-6 w-6 rounded-10 border bg-white'
                )}
            />
            {type === 'size' ? (
                <Image
                    src={Krest}
                    width={13}
                    height={26}
                    className={cn('absolute left-1.5 top-0.5 opacity-0 peer-checked:opacity-100')}
                    alt=''
                />
            ) : (
                <div
                    className={
                        'absolute left-0.5 top-0.5 h-2 w-2 rounded-5 bg-black opacity-0 peer-checked:opacity-100'
                    }
                />
            )}
        </label>
    );
};
