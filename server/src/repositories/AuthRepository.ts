import { createClerkClient } from '@clerk/clerk-sdk-node';
import { Context } from 'hono';
import { AppEnv } from '..';
import { env } from 'hono/adapter';

class AuthRepository {
    private clerkClient!: ReturnType<typeof createClerkClient>;

    connect(context: Context) {
        const key = env<AppEnv>(context).CLERK_KEY;
        this.clerkClient = createClerkClient({ secretKey: key });
    }

    async validateJWT(token: string): Promise<{ userId: string } | null> {
        const isValid = await this.clerkClient.verifyToken(token);
        if (!isValid) return null;

        return { userId: isValid.sub };
    }

    async getClerkUserContext(userId: string) {
        return await this.clerkClient.users.getUser(userId);
    }
}

export const authRepository = new AuthRepository();
