import React, { useCallback, useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
const AppRouter = () => {
	return <DynamicRoute loading={<div>loading</div>} redirect="/" auth={true} />;
};

const PrivateRouter = (props) => (props.auth ? <Route path={props.path} component={props.component} exact={props.exact} /> : <Redirect to={props.to} />);

const AsyncComponent = (props) => {
	const [Component, setComponent] = useState(null);

	useEffect(() => {
		let cleanedUp = false;
		props.component
			.then((component) => {
				if (cleanedUp) {
					return;
				}
				setComponent(() => component);
			})
			.catch((e) => {
				if (!cleanedUp) {
					setComponent(null);
				}
				if (typeof props.onError === "function") {
					props.onError(e, props.history);
					return;
				}
				throw e;
			});
		return () => {
			setComponent(null);
			cleanedUp = true;
		};
	}, [props.path]);

	return Component ? React.createElement(Component, props.otherProps) : props.loading;
};

const DynamicRoute = (props) => {
	const getPage = useCallback(
		// http://localhost/user/login > path=/user/login
		(path) =>
			// url 페이지 컴포넌트 라우팅
			import("../pages" + ( path.split("/")[2] != undefined ? (path) : (path+path) ))
				.then((module) => module.default)
				.catch((e) => {
					// "http://localhost/"인 경우 main 페이지로 redirect
					if (path=="/") {
						return import ("../pages/home" + "/home").then((module) => module.default);
					}
					// pages 해당 모듈 없는 경우 404 페이지로 redirect
					else if (/not find module/.test(e.message)) {
						return import("../pages/nonePage" + "/nonePage").then((module) => module.default);
					}
					throw e;
				}),
		[],
	);
	if (!props.auth) {
		return <Redirect to={props.redirect} />;
	}
	return (
		<Route
			path="/"
			render={({ history }) => (
				<AsyncComponent
					path={history.location.pathname}
					search={history.location.search}
					component={getPage(history.location.pathname)}
					loading={props.loading || "Loading.."}
					onError={props.onError}
					otherProps={props.props}
					history={history}
				/>
			)}
		/>
	);
};

export default AppRouter;
