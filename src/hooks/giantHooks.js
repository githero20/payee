/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { usePaystackPayment } from 'react-paystack';
import {
  CREATE_PAYMENT,
  PAYMENT_LOADED,
  PAYMENT_LOADING,
} from '../redux/types';

// usePayment hook handles all logic related to payments
export const usePayment = () => {
  const dispatch = useDispatch();
  const [banks, setBanks] = useState([]);
  let [paymentData, setPaymentData] = useState({
    bankCode: '044',
    accNo: '',
    accName: '',
    amount: 0,
    email: '',
    reference: '',
    date: Date(),
  });
  const config = {
    reference: new Date().getTime().toString(),
    email: paymentData.email,
    amount: paymentData.amount * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  };
  const initializePayment = usePaystackPayment(config);
  const { loading, transaction_history } = useSelector((root) => root.payments);

  // if payment was successful
  const onSuccess = (reference) => {
    dispatch({
      type: CREATE_PAYMENT,
      payload: { ...paymentData, reference },
    });
  };

  // if payment was not successful
  const onClose = () => {
    // if the Paystack dialog closes.
    console.log('closed');
    Swal.fire('Try again', 'Transaction could not be completed.', 'error');
    dispatch({ type: PAYMENT_LOADED });
  };

  // get the list of nigerian banks
  function getBanks() {
    axios
      .get(
        'https://raw.githubusercontent.com/tomiiide/nigerian-banks/master/banks.json'
      )
      .then((res) => {
        setBanks(res.data);
      })
      .catch((err) => console.log(err));
  }

  // display single transaction details
  function displayOneDetail(params) {
    Swal.fire({
      title: 'Transaction Details',
      html: `<p><b>Name:</b> ${params.accName}</p> 
            <p><b>Amount:</b> ${params.amount}</p>
            <p><b>Account Number</b>: ${params.accNo}</p>
            <p><b>Date:</b> ${params.date?.slice(0, 21)}</p>
      `,
      focusConfirm: false,
    });
  }

  // display verify account details
  function getUserDetails(num) {
    axios
      .get(
        `https://api.paystack.co/bank/resolve?account_number=${num}&bank_code=${paymentData.bankCode}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`,
          },
        }
      )
      .then((res) => {
        res.data.status
          ? setPaymentData({
              ...paymentData,
              accName: res.data.data.account_name,
              accNo: num,
            })
          : setPaymentData({ ...paymentData, accName: '' });
      })
      .catch((err) => setPaymentData({ ...paymentData, accName: '' }));
  }

  // send funds to beneficiary
  function sendFunds() {
    if (paymentData.amount < 100 || paymentData.amount > 10000000) {
      Swal.fire(
        'Sorry',
        'Funds must greater N100 but less than N10,000,000',
        'error'
      );
    } else {
      dispatch({ type: PAYMENT_LOADING });
      setTimeout(() => {
        initializePayment(onSuccess, onClose);
        setPaymentData({
          ...paymentData,
          accNo: '',
          accName: '',
          email: '',
          reference: '',
          date: Date(),
        });
      }, 3000);
    }
  }
  useEffect(() => {
    getBanks();
  }, []);
  return {
    banks,
    paymentData,
    setPaymentData,
    getUserDetails,
    sendFunds,
    loading,
    transaction_history,
    displayOneDetail,
  };
};
