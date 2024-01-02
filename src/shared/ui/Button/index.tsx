import cn from 'classnames';
import Link from 'next/link';
import { useMemo, type FC } from 'react';
import { type EnumType, type OneOf, type PropsOf } from '../../lib';

export const ButtonType = {
    Register: 'register',
    Buy: 'buy',
} as const;

type ButtonPrimaryProps = OneOf<
    Omit<PropsOf<'button'>, 'type' | 'children'>,
    Omit<PropsOf<typeof Link>, 'type' | 'children'>
> &
    React.PropsWithChildren & { type: EnumType<typeof ButtonType> };

export const ButtonPrimary: FC<ButtonPrimaryProps> = ({ type = ButtonType.Buy, ...props }) => {
    if (props.href !== undefined) return <Link {...props} />;

    const className = useMemo(
        () =>
            cn(
                'solid border border-black uppercase',
                type === 'buy' && 'text-button bg-button font-600',
                type === 'register' && 'bg-border-authorization text-black text-16 py-2 font-400',
                props.className
            ),
        [type, props.className]
    );

    return <button {...props} className={className} />;
};
