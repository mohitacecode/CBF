// import { showMessage } from "app/store/actions/fuse";
// import PaymentsService from "app/services/payments/paymentsService";

// export const PING_RAZORPAY = "[PAYMENTS] PING RAZORPAY";

// export function PingRazorpay() {
// 			return (dispatch) =>
// 			PaymentsService.pingRazorpay({
// 			}).then((response) => {
// 				// dispatch(showMessage({ message: "Prof" }));
// 				return dispatch({
// 					type: PING_RAZORPAY,
// 					payload: response.data,
// 				});
// 			});
// }

// export function verifyPayment(data) {
// 	return dispatch =>
// 		PaymentsService.verifyPayment({
// 			data: {...data}
// 		}).then((response) => {
// 				if(response.data.verify)
// 				 	dispatch(showMessage({ message: "Payment Successful" }));
// 				 else
// 				 	dispatch(showMessage({ message: "Fake Payment" }));
// 				return dispatch({
// 					type: PING_RAZORPAY,
// 				});
// 			});
// }
