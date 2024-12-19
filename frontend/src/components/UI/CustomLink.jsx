import { forwardRef } from "react";
import { Link } from "react-router";


const CustomLink = forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
))


export default CustomLink