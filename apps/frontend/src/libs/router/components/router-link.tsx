import { cn } from "@/shared/utils";
import { NavLink, useLocation, type NavLinkProps } from "react-router";

type FeatureProps = {
   to: string;
   activeClassName: string;
   disabled?: boolean;
};

type Props = NavLinkProps & FeatureProps;
export function RouterLink({ to, activeClassName, disabled, ...props }: Props) {
   const { pathname } = useLocation();

   if (disabled) {
      props.onClick = undefined;
      props.className = cn(props.className, "opacity-11");
      return <span role="button" {...(props as any)} />;
   }
   if (pathname.includes(to)) {
      props.className = cn(props.className, activeClassName);
   }
   return (
      <NavLink to={to} {...props}>
         {props.children}
      </NavLink>
   );
}
