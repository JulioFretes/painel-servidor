import React from "react";
import { Route, Routes } from "react-router";

import { PrivateRoutes } from "./private";
import { PublicRoutes } from "./public";
import ErrorBoundary from "../templates/ErrorBoundary";

const PainelAdmin = React.lazy(() => import("../pages/Admin"));
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const NotFound = React.lazy(() => import("../pages/Error/404"));
const Forbidden = React.lazy(() => import("../pages/Error/403"));

export default function () {
    return (
        <ErrorBoundary>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/forbidden" element={<Forbidden />} />
                </Route>

                <Route element={<PrivateRoutes permissao="admin" />}>
                    <Route path="/admin" element={<PainelAdmin />} />
                </Route>

                <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/404" element={<NotFound />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </ErrorBoundary>
    );
}
