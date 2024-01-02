import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { objectToAuthDataMap, AuthDataValidator } from '@telegram-auth/server';
import bcrypt from 'bcrypt';
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { env } from '~/shared/lib';
import { db } from '../db';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: { id: string } & DefaultSession['user'];
    }
}
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    callbacks: {
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                },
            };
        },
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            credentials: {
                email: { type: 'text' },
                password: { type: 'password' },
            },
            authorize: async credentials => {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await db.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (!user?.password) return null;

                const passwordsMatch = await bcrypt.compare(credentials.password, user.password);

                if (!passwordsMatch) return null;

                return user;
            },
        }),
        CredentialsProvider({
            id: 'telegram',
            credentials: {},
            authorize: async (_, request) => {
                const validator = new AuthDataValidator({ botToken: env.TELEGRAM_SECRET });
                const data = objectToAuthDataMap(request.query ?? {});
                const validated = await validator.validate(data);

                const user = {
                    id: validated.id.toString(),
                    name: validated.first_name.concat(validated.last_name ? ` ${validated.last_name}` : ''),
                    image: validated.photo_url,
                };

                try {
                    await db.user.upsert({
                        where: {
                            id: user.id,
                        },
                        create: user,
                        update: user,
                    });

                    return user;
                } catch {
                    return null;
                }
            },
        }),
    ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
