import { withSafeBoundary } from "@/shared/components";
import type { ReactNode } from "react";
import { Helmet } from "react-helmet";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>404 page</title>
      </Helmet>
      {children}
   </>
);

const NotFoundPage = withSafeBoundary(() => {
   return (
      <HelmetContainer>
         <p>Not Found Page</p>
      </HelmetContainer>
   );
});

export default NotFoundPage;
