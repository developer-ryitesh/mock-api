import { loggerMiddlewareRedux } from "./logger-middleware.redux";
import { toastMiddlewareRedux } from "./toast-middleware.redux";

const middlewares = [loggerMiddlewareRedux, toastMiddlewareRedux];
export default middlewares;
