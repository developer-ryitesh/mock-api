import { withSafeBoundary } from "@/shared/components";
import { type ReactNode } from "react";
import { Helmet } from "react-helmet";
import { Button, TextField } from "@/shared/ui";
import useLoginController from "./login.controller";
import { Link } from "react-router";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
  <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    {children}
  </>
);

const LoginPage = withSafeBoundary(() => {
  const ctrl = useLoginController();
  
  return (
    <HelmetContainer>
      <form onSubmit={ctrl.onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
        </div>
        <div className="grid gap-3">
          <div>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={ctrl.fields.email}
              onChange={ctrl.onChange}
              required
            />
          </div>

          <div>
            <div className="flex items-center mb-2">
              <label htmlFor="password" className="font-normal">
                Password
              </label>
              <Link to="/auth/forgot-password" className="ml-auto text-sm underline-offset-2 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <TextField
              type="text"
              name="password"
              value={ctrl.fields.password}
              onChange={ctrl.onChange}
              required
            />
          </div>
          <div>
            <Button type="submit" className="w-full" loading={ctrl.login.isLoading}>
              Login
            </Button>
          </div>
        </div>
      </form>
    </HelmetContainer>
  );
});

export default LoginPage;
