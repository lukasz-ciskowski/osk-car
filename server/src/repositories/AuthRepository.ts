import { v1 } from '@authzed/authzed-node';
import { Context } from 'hono';
import { env } from 'hono/adapter';
import { AppEnv } from '..';

const schema = `
definition oskcar/user {}
definition oskcar/planner {
	relation student: oskcar/user
	relation instructor: oskcar/user
	permission read = student + instructor
	permission write = instructor
}`;

class AuthRepository {
    private _client!: v1.ZedClientInterface;

    constructor() {}

    async connect(context: Context) {
        const token = env<AppEnv>(context).AUTHZED_TOKEN;
        this._client = v1.NewClient(token, 'grpc.authzed.com:443');
        const request = v1.WriteSchemaRequest.create({
            schema: schema,
        });
        await this._client.promises.writeSchema(request);
    }

    check() {}
}

export const authRepository = new AuthRepository();
