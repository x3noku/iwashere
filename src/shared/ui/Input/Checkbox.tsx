import cn from 'classnames';
import Image from 'next/image';
import React, { useId, type FC } from 'react';
import Krest from '~/shared/assets/svg/checkKrest.svg';
import Mark from '~/shared/assets/svg/checkMark.svg';
import { type EnumType } from '../../lib';

const CheckboxType = {
    REGISTER: 'register',
    SEARCH: 'search',
} as const;

type CheckboxProps = React.PropsWithChildren & {
    idForLabel?: string;
    className?: string;
    type: EnumType<typeof CheckboxType>;
};

export const Checkbox: FC<CheckboxProps> = ({ type = 'register', className, children, idForLabel }) => {
    const id = idForLabel ?? useId();

    return (
        <label htmlFor={id} className={cn('relative flex cursor-pointer select-none items-center', className)}>
            <input
                id={id}
                type={'checkbox'}
                className={cn(
                    'solid peer appearance-none rounded-5 border border-black bg-border-authorization',
                    type === 'register' && 'h-4 w-4 border-[0.3px]',
                    type === 'search' && 'h-2 w-2'
                )}
            />
            <Image
                src={type === 'register' ? Mark : Krest}
                className={cn(
                    'absolute opacity-0 peer-checked:opacity-100',
                    type === 'register' && 'left-0 top-0 ',
                    type === 'search' && 'left-px top-0'
                )}
                alt={''}
            />
            {children}
        </label>
    );
};
