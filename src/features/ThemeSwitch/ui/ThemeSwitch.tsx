'use client';

import { type FC } from 'react';
import { type PropsOf } from '~/shared/lib';
import { switchTheme } from '../helpers/switchTheme';

interface ThemeSwitchProps extends PropsOf<'input'> {}

export const ThemeSwitch: FC<ThemeSwitchProps> = props => {
    return <input {...props} type={'checkbox'} onChange={switchTheme} />;
};
