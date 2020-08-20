// import React, { useEffect } from "react";
// //material-ui
// import Button from "@material-ui/core/Button";
// import FormControl from "@material-ui/core/FormControl";
// //redux
// import withReducer from "app/store/withReducer";
// import { useDispatch, useSelector } from "react-redux";
// import * as Actions from "./store/actions";
// import reducer from "./store/reducers";
// function Payments() {
// 	// const classes = useStyles(props);
// 	let paymentsDetails = useSelector(({ Payments }) => Payments.paymentsReducer.data);
// 	const dispatch = useDispatch();
// 	const pingApi = () => {
// 		dispatch(Actions.PingRazorpay());
// 	};
// 	const openCheckout = (data) => {
// 		let options = {
// 			key: data.dataKey,
// 			amount: data.dataAmount,
// 			name: data.user.first_name,
// 			description: "Purchase Description",
// 			order_id: data.orderId,
// 			handler: function (response) {
// 				const sendData = {
// 					razorpay_order_id: response.razorpay_order_id,
// 					razorpay_payment_id: response.razorpay_payment_id,
// 					razorpay_signature: response.razorpay_signature,
// 					amount: data.dataAmount
// 				};
// 				dispatch(Actions.verifyPayment(sendData));
// 			},
// 			prefill: {
// 				name: data.user.first_name + " " + data.user.last_name,
// 				email: data.user.email
// 			},
// 			notes: {
// 				address: data.user.address
// 			},
// 			theme: {
// 				color: "#F37254"
// 			}
// 		};

// 		let rzp = new window.Razorpay(options);
// 		rzp.open();
// 	};

// 	useEffect(() => {
// 		const script = document.createElement("script");
// 		script.src = "https://checkout.razorpay.com/v1/checkout.js";
// 		script.async = true;
// 		document.body.appendChild(script);
// 	}, []);
// 	if (paymentsDetails) {
// 		openCheckout(paymentsDetails);
// 	}
// 	return (
// 		<div>
// 			<FormControl
// 				className="flex w-full flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24 sm:w-320 mx-16"
// 				variant="outlined">
// 				<Button className="whitespace-no-wrap normal-case" variant="contained" color="secondary" onClick={pingApi}>
// 					<span className="hidden sm:flex">Pay Now</span>
// 					<span className="flex sm:hidden">New</span>
// 				</Button>
// 			</FormControl>
// 			<h1>Something here</h1>
// 		</div>
// 	);
// }

// export default withReducer("Payments", reducer)(Payments);
