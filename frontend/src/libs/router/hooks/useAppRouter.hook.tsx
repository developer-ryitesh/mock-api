import { useNavigate, useParams, useSearchParams } from "react-router";

export function useAppRouter() {
   const navigate = useNavigate();
   const params = useParams();
   const [searchParams, setSearchParams] = useSearchParams();
   const query = new URLSearchParams(searchParams.toString());

   const set = (entries: Record<string, string>) => {
      setSearchParams(
         (prev) => {
            const newParams = new URLSearchParams(prev); // copy existing params
            for (const [key, value] of Object.entries(entries)) {
               newParams.set(key, value);
               query.set(key, value);
            }
            return newParams;
         },
         { replace: false }
      );
   };

   const clear = () => {
      const newParams = new URLSearchParams(); // empty params
      setSearchParams(newParams, { replace: true });
   };

   const object: Record<string, string> = {};

   for (const [key, value] of query.entries()) {
      object[key] = value;
   }

   return {
      push: (path: string) => navigate(path),
      replace: (path: string) => navigate(path, { replace: true }),
      params: params,
      queryString: {
         set,
         url: query ? "?" + query : "",
         data: object,
         clear,
      },
   };
}
