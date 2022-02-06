import { lazy } from "react";

const Landing = lazy(() => import("./landing/Landing"));
const ForgotPassword = lazy(() => import("./landing/ForgotPassword"));
const ResetPassword = lazy(() => import("./landing/ResetPassword"));
const NotFound = lazy(() => import("./landing/NotFound"));

export { Landing, ForgotPassword, ResetPassword, NotFound };
