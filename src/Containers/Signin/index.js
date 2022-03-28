// import React, { useEffect, useState } from "react";
// import { Link, Redirect } from "react-router-dom";
// import "./style.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getSigninOtpAction,
//   resendOtpAction,
//   VerfifyOtpAction,
// } from "../../actions/auth.action";
// import { InputComponents } from "../../Components/Inputs";
// import { MessageModal } from "../../Components/Modal";

// const Signin = (props) => {
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);
//   const store = useSelector((state) => state.userStore);
//   const [showError, setShowError] = useState(false);
//   const [showCheckError, setShowCheckError] = useState(false);
//   const [checkMsgError, setCheckMsgError] = useState("");
//   const [ready, setReady] = useState(false);
//   const [phoneNo, setPhoneNo] = useState("");
//   const errorMessage = useSelector((state) => state.auth.error);
//   const [showValidation, setShowValidation] = useState(false);
//   const [validation, setValidation] = useState("");
//   const [showloadingButton, setShowLoadingButton] = useState(false);
//   const [showOtp, setShowOtp] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [resendOTP, setResendOTP] = useState(false);
//   const [readyOtp, setReadyOtp] = useState(false);
//   const errorMessageOtp = useSelector((state) => state.auth.error);
//   const [showValidationOTP, setShowValidationOTP] = useState(false);
//   const [validationOTP, setValidationOTP] = useState("");
//   const [showErrorOtp, setShowErrorOtp] = useState(false);
//   const { initialMinute = 2, initialSeconds = 0 } = props;
//   const [minutes, setMinutes] = useState(initialMinute);
//   const [seconds, setSeconds] = useState(initialSeconds);

//   useEffect(() => {
//     if (auth.errorTF && ready && errorMessage !== "") {
//       setShowLoadingButton(false);
//       setShowError(true);
//     }
//     if (auth.verifying && !auth.authenticating && errorMessage === "") {
//       setShowValidation(false);
//       setValidation("");
//       setShowLoadingButton(false);
//       setReady(false);
//       setShowOtp(true);
//     }
//     if (
//       auth.authenticating &&
//       auth.errorTF &&
//       readyOtp &&
//       errorMessageOtp !== ""
//     ) {
//       setShowLoadingButton(false);
//       setShowErrorOtp(true);
//     }
//   }, [auth, ready, errorMessage, readyOtp, errorMessageOtp]);

//   useEffect(() => {
//     if (!auth.sentOtp && resendOTP && errorMessage !== "") {
//       setShowErrorOtp(true);
//     }
//   }, [auth, resendOTP, errorMessage]);

//   useEffect(() => {
//     if (auth.sentOtp && resendOTP && errorMessage === "") {
//       setMinutes(2);
//       setResendOTP(false);
//     }
//   }, [auth, resendOTP, errorMessage]);

//   useEffect(() => {
//     if (showOtp) {
//       let myInterval = setInterval(() => {
//         if (seconds > 0) {
//           setSeconds(seconds - 1);
//         }
//         if (seconds === 0) {
//           if (minutes === 0) {
//             clearInterval(myInterval);
//           } else {
//             setMinutes(minutes - 1);
//             setSeconds(59);
//           }
//         }
//       }, 1000);
//       return () => {
//         clearInterval(myInterval);
//       };
//     }
//   });

//   if (auth.authenticate && store && store.userStore) {
//     if (
//       props &&
//       props.location &&
//       props.location.state &&
//       props.location.state.Store &&
//       props.location.state.path
//     ) {
//       return <Redirect to={props.location.state.path} />;
//     } else {
//       return <Redirect to="/storeDashboard" />;
//     }
//   }

//   // if (auth.authenticate && store && store.userStore) {
//   //   return <Redirect to="/storeDashboard" />;
//   // }

//   const handleChange = (e) => {
//     const value = e.target.value.replace(/\D/g, "");
//     return setPhoneNo(value);
//   };

//   const showErrorMsg = (type) => {
//     setShowValidation(true);
//     setValidation(type);
//   };

//   const showErrorMsgOTP = (type) => {
//     setShowValidationOTP(true);
//     setValidationOTP(type);
//   };

//   const validationCheck = () => {
//     if (
//       isNaN(phoneNo) ||
//       (phoneNo.charAt(0) !== "9" &&
//         phoneNo.charAt(0) !== "8" &&
//         phoneNo.charAt(0) !== "7")
//     ) {
//       return showErrorMsg("PhoneNumber");
//     } else if (phoneNo.length < 10) {
//       return showErrorMsg("PhoneNumber");
//     } else if (phoneNo.length > 10) {
//       showErrorContent("Phone number should be 10 digit number");
//       return showErrorMsg("PhoneNumber");
//     } else {
//       return true;
//     }
//   };

//   const SigninPhone = (e) => {
//     e.preventDefault();

//     if (phoneNo === "") {
//       return setShowValidation(true);
//     }
//     const validation = validationCheck();

//     if (validation) {
//       const from = {
//         loginId: phoneNo,
//       };

//       setShowLoadingButton(true);
//       setReady(true);
//       dispatch(getSigninOtpAction(from));
//     }
//   };

//   const showErrorContent = (msg) => {
//     return (
//       <span className="error-mafg-in-validdatiom-in-inout-area">{msg}</span>
//     );
//   };

//   const validForPhoneNo = () => {
//     if (
//       phoneNo.charAt(0) !== "9" &&
//       phoneNo.charAt(0) !== "8" &&
//       phoneNo.charAt(0) !== "7"
//     ) {
//       return showErrorContent("Invalid phone number please check");
//     } else {
//       if (phoneNo.length < 10) {
//         return showErrorContent("Phone number should be 10 digit number");
//       } else if (phoneNo.length > 10) {
//         return showErrorContent("Phone number should be 10 digit number");
//       } else {
//         return null;
//       }
//     }
//   };

//   const show = (msg) => {
//     setCheckMsgError(msg);
//     setShowCheckError(true);
//     return false;
//   };

//   const verifyOtp = (e) => {
//     e.preventDefault();

//     if (!phoneNo) {
//       return show("Please try to signin");
//     }

//     if (isNaN(otp)) {
//       return showErrorMsgOTP("Otp");
//     }
//     if (otp === "") {
//       return showErrorMsgOTP("Otp");
//     }
//     if (otp.length < 6) {
//       return showErrorMsgOTP("Otp");
//     }
//     if (otp.length > 6) {
//       return showErrorMsgOTP("Otp");
//     }

//     const form = {
//       loginId: phoneNo,
//       otp: otp,
//     };
//     setShowLoadingButton(true);
//     setReadyOtp(true);
//     dispatch(VerfifyOtpAction(form));
//   };

//   const resendOtp = (e) => {
//     e.preventDefault();

//     if (!phoneNo) {
//       return show("Please try to signin");
//     }
//     const form = {
//       loginId: phoneNo,
//     };

//     setResendOTP(true);
//     dispatch(resendOtpAction(form));
//   };

//   return (
//     <>
//       <div className="backoround-for-all-same-page">
//         <div
//           style={{
//             justifyContent: "center",
//             background: "#f5f5f5",
//           }}
//         >
//           <div className="crevthzdcsggjny">
//             <div>
//               <section className="scr-jvdrs-escvtvs">
//                 <header className="s">
//                   <h1 className="vrecf-uujfncvbyyh">Welcome</h1>
//                 </header>
//                 {showOtp ? (
//                   <>
//                     <section className="vrvukasfcfvyh">
//                       <div className="cdfre-ervh">
//                         {/* <div className="width-of-country-cde-ateje">
//                         <p className="country-code-in-dekajde-aed">Country</p>
//                         <h2 className="incuwc-ancuwjnc">🇮🇳 +91</h2>
//                         <div className="heigth-at-ocjcdpaerupiej"></div>
//                       </div> */}
//                         <p className="pargraphio-bgdn-iu">
//                           We have sent an OTP to your mobile number, please
//                           enter the OTP to login
//                         </p>
//                         <input
//                           className="svs-hiovsn-viose"
//                           onChange={handleChange}
//                           placeholder={"Enter 6 digit OTP Number"}
//                           maxLength={10}
//                           type={"number"}
//                           name={"OTP"}
//                           label={"OTP Number"}
//                           value={otp}
//                           onChange={(e) =>
//                             setOtp(e.target.value.replace(/[^0-9]/g, ""))
//                           }
//                           placeholder={"Enter 6 digit OTP Number"}
//                           maxLength={6}
//                           type="number"
//                         ></input>
//                       </div>
//                       <div className="resend-oypsec-div-display-end">
//                         {minutes === 0 && seconds === 0 ? (
//                           <div
//                             className="resendotpbtninotpsection"
//                             style={{ cursor: "pointer" }}
//                             onClick={resendOtp}
//                           >
//                             Resend OTP
//                           </div>
//                         ) : (
//                           <h1>
//                             {" "}
//                             {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
//                           </h1>
//                         )}
//                       </div>
//                       {showValidationOTP &&
//                       validationOTP === "Otp" &&
//                       otp.length !== 6
//                         ? showErrorContent(
//                             <div className="error-mafg-in-validdatiom-in-inout-area">
//                               Invalid OTP Please check
//                             </div>
//                           )
//                         : null}
//                       {showValidation && validation === "PhoneNumber"
//                         ? validForPhoneNo()
//                         : null}
//                       <div>
//                         {showloadingButton ? (
//                           <button
//                             className="get-startde-bottom-btn"
//                             // style={{ background: "#696969" }}
//                           >
//                             Please wait.....
//                           </button>
//                         ) : minutes === 0 && seconds === 0 ? (
//                           <div
//                             className="get-startde-bottom-btn"
//                             style={{ background: "#696969" }}
//                           >
//                             <span className="title-svelte-1b3vcum">Verify</span>
//                           </div>
//                         ) : (
//                           <div
//                             className="get-startde-bottom-btn"
//                             onClick={verifyOtp}
//                           >
//                             <span className="title-svelte-1b3vcum">Verify</span>
//                           </div>
//                         )}
//                       </div>
//                     </section>
//                   </>
//                 ) : (
//                   <section className="vrvukasfcfvyh">
//                     <div className="cdfre-ervh">
//                       {/* <div className="width-of-country-cde-ateje">
//                         <p className="country-code-in-dekajde-aed">Country</p>
//                         <h2 className="incuwc-ancuwjnc">🇮🇳 +91</h2>
//                         <div className="heigth-at-ocjcdpaerupiej"></div>
//                       </div> */}
//                       <p className="pargraphio-bgdn-iu">
//                         We will send OTP to your mobile number, please enter the
//                         OTP to login
//                       </p>
//                       <input
//                         className="svs-hiovsn-viose"
//                         value={phoneNo}
//                         onChange={handleChange}
//                         placeholder={"Enter mobile number"}
//                         maxLength={10}
//                         type={"number"}
//                       ></input>
//                     </div>
//                     {showValidation &&
//                     phoneNo.length < 10 &&
//                     validation !== "PhoneNumber"
//                       ? showErrorContent(
//                           <div className="error-mafg-in-validdatiom-in-inout-area">
//                             {phoneNo.length < 10
//                               ? "Invalid phone number please check"
//                               : "Phone number should be 10 digit number"}
//                           </div>
//                         )
//                       : null}

//                     {showValidation && validation === "PhoneNumber"
//                       ? validForPhoneNo()
//                       : null}
//                     <div>
//                       {showloadingButton ? (
//                         <button className="tvyubinom">Please wait.....</button>
//                       ) : (
//                         <button className="tvyubinom" onClick={SigninPhone}>
//                           Send OTP
//                         </button>
//                       )}
//                     </div>
//                   </section>
//                 )}
//               </section>
//               <div className="csdca-tbumnge">
//                 <div className="line-through-login-instaed"></div>

//                 <Link to="/signin">
//                   <p className="csdca-tbumnge">Dont have account</p>
//                 </Link>

//                 <div className="line-through-login-instaed"></div>
//               </div>
//               <Link to="/free-online-store">
//                 <h2 className="back-top-home-page-djhfr">
//                   Create Online Store
//                 </h2>
//               </Link>
//               <Link to="/">
//                 <h2 className="back-top-home-page-djhfr">Back</h2>
//               </Link>
//             </div>
//           </div>
//         </div>
//         <MessageModal
//           visible={showError}
//           onClose={() => {
//             setShowError(false);
//             setReady(false);
//           }}
//           title={"Oooppss!"}
//           message={errorMessage}
//         />
//         <MessageModal
//           visible={showErrorOtp}
//           onClose={() => {
//             setShowErrorOtp(false);
//             setReadyOtp(false);
//           }}
//           title={"Oooppss!"}
//           message={errorMessageOtp}
//         />
//         <MessageModal
//           visible={showCheckError}
//           onClose={() => {
//             setShowCheckError(false);
//             setCheckMsgError("");
//           }}
//           title={"Oooppss!"}
//           message={checkMsgError}
//         />
//       </div>
//     </>
//   );
// };

// export default Signin;
