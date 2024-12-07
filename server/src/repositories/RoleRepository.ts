import { Context } from 'hono';
import { env } from 'hono/adapter';
import { AppEnv } from '..';
import { GRPC } from '@cerbos/grpc';
import { User } from '@prisma/client';
import { Modules } from '@osk-car/models';

type RoleResponse = Record<Modules['kind'], Partial<Record<Modules['actions'][number], boolean>>>;

class RoleRepository {
    private client!: GRPC;

    async connect(context: Context) {
        const url = env<AppEnv>(context).CERBOS_URL;

        this.client = new GRPC(url, {
            tls: false,
        });
    }

    async checkRole(user: User, module: Modules) {
        const resourceObject = {
            principal: {
                id: user.id.toString(),
                roles: [user.type],
            },
            resource: {
                id: user.id.toString(),
                kind: module.kind,
            },
        };

        return await module.actions.reduce<Promise<Partial<RoleResponse>>>(async (accPromise, action) => {
            const acc = await accPromise;
            acc[module.kind] = {
                ...acc[module.kind],
                [action]: !!(await this.client.isAllowed({
                    ...resourceObject,
                    action,
                })),
            };
            return acc;
        }, Promise.resolve({}));
    }
}

export const roleRepository = new RoleRepository();
