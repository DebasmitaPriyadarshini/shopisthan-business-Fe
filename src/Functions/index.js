import { useSelector } from "react-redux";

export function StorePlanDeatils(id) {
  const storePlanLists = useSelector((state) => state.storePlans.storePlans);
  if (!storePlanLists) {
    return null;
  }
  const value = storePlanLists.filter((plan) => plan._id === id);
  return value && value.length > 0 ? value[0] : null;
}

export function PriceWithComma(price) {
  if (!price) {
    return null;
  }
  return "₹" + price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function FreeStorePlanNoOfDaysCompleted(details) {
  if (!details) {
    return null;
  }
  const date1 = new Date(details);
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var todayDate = mm + "/" + dd + "/" + yyyy;
  const date2 = new Date(todayDate);
  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }
  return getDifferenceInDays(date1, date2) > 30;
}

const intlFormat = (num) => {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
};

export const showFollowerNumbers = (num) => {
  if (num >= 1000000) return intlFormat(num / 1000000) + "M";
  if (num >= 1000) return intlFormat(num / 1000) + "k";
  return intlFormat(num);
};
// amount in words

export const showOrdersAmountNumbers = (num) => {
  if (num < 10000) return "₹" + num;
  if (num >= 1000000) return intlFormat(num / 1000000) + "M";
  if (num >= 10000) return intlFormat(num / 1000) + "k";
  return intlFormat("₹" + num);
};

// const giveDate = (date) => {
//   const mlist = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const m1 = date.charAt(0);
//   const m2 = date.charAt(1);
//   const d1 = date.charAt(3);
//   const d2 = date.charAt(4);
//   const year = date.slice(6, 10);

//   return { m1, m2, d1, d2, year, mlist };
// };

// const show = (ans, m) => {
//   var numOfYears = 1;
//   if (m === 0) {
//     var expireDate = new Date(
//       ans.d1 + ans.d2 + " " + ans.mlist[ans.m2 - 1] + " " + ans.year
//     );
//   } else {
//     var expireDate = new Date(
//       ans.d1 + ans.d2 + " " + ans.mlist[ans.m1 + ans.m2 - 1] + " " + ans.year
//     );
//   }

//   expireDate.setFullYear(expireDate.getFullYear() + numOfYears);
//   expireDate.setDate(expireDate.getDate() - 1);
//   const asd = expireDate.toString();
//   const M = asd.slice(4, 7);
//   const D = asd.slice(8, 10);
//   const Y = asd.slice(11, 15);
//   return D + " " + M + " " + Y;
// };

// const storeExpiry = (date) => {
//   const ans = giveDate(date);
//   if (ans.m1 === "0") {
//     const value = show(ans, 0);
//     return value;
//   } else {
//     const value = show(ans, 1);
//     return value;
//   }
// };

// const storeDate = (date) => {
//   const ans = giveDate(date);

//   if (ans.m1 === "0") {
//     return ans.d1 + ans.d2 + " " + ans.mlist[ans.m2 - 1] + " " + ans.year;
//   } else {
//     return (
//       ans.d1 + ans.d2 + " " + ans.mlist[ans.m1 + ans.m2 - 1] + " " + ans.year
//     );
//   }
// };
