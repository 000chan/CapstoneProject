import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";

const Missing = () => {
	const dispatch = useDispatch();
	return (
		<>
			<button
				onClick={() => {
					dispatch(push("/main"));
				}}
			>
				홈으로 돌아가기
			</button>
		</>
	);
};

export default Missing;
