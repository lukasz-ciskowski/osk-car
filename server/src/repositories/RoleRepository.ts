import { Context } from 'hono';
import { env } from 'hono/adapter';
import { AppEnv } from '..';
import { GRPC } from '@cerbos/grpc';
import { User } from '@prisma/client';
import { Modules } from '../models/AuthModel';

type RoleResponse = Record<Modules['kind'], Partial<Record<Modules['actions'][number], boolean>>>;

class RoleRepository {
    private client!: GRPC;

    async connect(context: Context) {
        const url = env<AppEnv>(context).CERBOS_URL;

        this.client = new GRPC(url, {
            tls: false,
        });
    }

    checkRole(user: User, module: Modules) {
        const resourceObject = {
            principal: {
                id: user.id,
                roles: [user.type],
            },
            resource: {
                id: user.id,
                kind: module.kind,
            },
        };

        return module.actions.reduce<Partial<RoleResponse>>((acc, action) => {
            acc[module.kind] = {
                ...acc[module.kind],
                [action]: !!this.client.isAllowed({
                    ...resourceObject,
                    action,
                }),
            };
            return acc;
        }, {});
    }
}

export const roleRepository = new RoleRepository();
