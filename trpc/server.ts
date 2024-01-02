import 'server-only';

import { createTRPCProxyClient, loggerLink, TRPCClientError } from '@trpc/client';
import { callProcedure } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import { type TRPCErrorResponse } from '@trpc/server/rpc';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { appRouter, createTRPCContext, type AppRouter } from '~/server';
import { env } from '~/shared/lib';
import { transformer } from './shared';

const createContext = cache(() => {
    return createTRPCContext({
        headers: new Headers({
            'cookie': cookies().toString(),
            'x-trpc-source': 'rsc',
        }),
    });
});

export const api = createTRPCProxyClient<AppRouter>({
    transformer,
    links: [
        loggerLink({
            enabled: op =>
                env.NEXT_PUBLIC_ENV === 'development' || (op.direction === 'down' && op.result instanceof Error),
        }),
        () =>
            ({ op }) =>
                observable(observer => {
                    createContext()
                        .then(ctx => {
                            return callProcedure({
                                procedures: appRouter._def.procedures,
                                path: op.path,
                                rawInput: op.input,
                                ctx,
                                type: op.type,
                            });
                        })
                        .then(data => {
                            observer.next({ result: { data } });
                            observer.complete();
                        })
                        .catch((cause: TRPCErrorResponse) => {
                            observer.error(TRPCClientError.from(cause));
                        });
                }),
    ],
});
