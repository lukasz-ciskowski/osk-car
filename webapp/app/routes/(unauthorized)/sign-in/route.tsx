import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';
import logo from '/logo.png';

function SignIn() {
    return (
        <SignedOut>
            <div className="flex items-center justify-center h-svh">
                <Card>
                    <CardHeader className="flex flex-col items-center">
                        <CardTitle className="text-3xl">
                            <img src={logo} alt="logo" className="h-16" />
                        </CardTitle>
                        <CardDescription className="font-light">Centrum szkolenia kierowców online</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 mt-5">
                        <SignInButton>
                            <Button>Zaloguj się</Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button variant="outline">Zarejestruj się</Button>
                        </SignUpButton>
                    </CardContent>
                </Card>
            </div>
        </SignedOut>
    );
}
export default SignIn;
