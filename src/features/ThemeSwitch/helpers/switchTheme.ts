import { cookie } from '~/shared/lib';

export const switchTheme = () => {
    const theme = cookie().get('theme');

    switch (theme) {
        case 'dark':
            document.documentElement.dataset.theme = 'light';
            cookie().set('theme', 'light');
            break;
        case 'light':
            document.documentElement.dataset.theme = 'dark';
            cookie().set('theme', 'dark');
            break;
    }
};
