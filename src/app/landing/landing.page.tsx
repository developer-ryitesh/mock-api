import type { ReactNode } from "react";
import { Helmet } from "react-helmet";

const HelmetContainer = ({ children }: { children: ReactNode }) => (
   <>
      <Helmet>
         <title>Home</title>
         <meta name="description" content="Landing page" />
         <meta name="keywords" content="React, SEO, Landing Page" />
      </Helmet>
      {children}
   </>
);

export default function LandingPage() {
   return (
      <HelmetContainer>
         <p>Landing page work!</p>
      </HelmetContainer>
   );
}
