import react, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import "firebase/firestore";

const Transact = ({ firestore }) => {
  // const [customers, setCustomers] = useState([]);
  const [sender_name, setSender] = useState("");
  const [receiver_name, setReceiver] = useState("");
  const [amount, setAmount] = useState(-1);
  const [sender_bal, setSenderBal] = useState();
  const [senderId, setSenderId] = useState();
  const [receiverId, setReceiverId] = useState();

  // let history = useHistory();
  const customersRef = firestore.collection("customers");
  const historyRef = firestore.collection("history");
  const [history] = useCollectionData(historyRef);
  const query = customersRef.orderBy("c_id");
  const [customers] = useCollectionData(query, { idField: "id" });

  var sender_id, receiver_id, t_id;

  const transactionHandler = async (e) => {
    e.preventDefault();

    try {
      if (sender_name == "") {
        window.alert("Select sender!");
        return;
      } else if (receiver_name == "") {
        window.alert("Select Receiver");
        return;
      } else if (sender_name == receiver_name) {
        window.alert("Sender and Receiver Cannot be the same!!");
        return;
      } else if (amount == -1 || amount == 0) {
        window.alert("Please enter amount to be transferred!");
        return;
      } else if (sender_bal < amount) {
        window.alert("Insufficient Funds!!");
        return;
      }

      transfer();

      window.confirm("Transaction Successful!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const transfer = async () => {
    // Remove amount from the sender
    customersRef.doc(senderId).update({
      balance: firebase.firestore.FieldValue.increment(-amount),
    });
    customersRef.doc(receiverId).update({
      balance: firebase.firestore.FieldValue.increment(amount),
    });

    // Add the transaction log to the history collection
    await historyRef.add({
      t_id: history.length + 1,
      sender: sender_name,
      receiver: receiver_name,
      transfer_amount: amount,
      date: String(new Date()).substring(0, 24),
    });
  };

  const senderChangeHandler = async (e) => {
    sender_id = e.target.value - 1;
    setSender(customers[sender_id].name);
    setSenderBal(customers[sender_id].balance);
    setSenderId(customers[sender_id].id);
  };

  const receiverChangeHandler = (e) => {
    receiver_id = e.target.value - 1;
    setReceiver(customers[receiver_id].name);
    setReceiverId(customers[receiver_id].id);
  };

  const amountChangeHandler = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="Transact">
      <div className="container transfer">
        <span className="title">
          <h1>Transfer Form</h1>
        </span>
        <br />
        <br />
        <form action="">
          <div className="select">
            {/* Sender: <br /> */}
            <select name="sender" id="sender" onChange={senderChangeHandler}>
              <option selected disabled hidden>
                Choose Sender
              </option>
              {customers &&
                customers.map((customer) => (
                  <option value={customer.c_id}>
                    {customer.name} [Rs.{customer.balance}]
                  </option>
                ))}
            </select>
            <span className="custom-arrow"></span>
          </div>
          <br />
          <div className="select">
            {/* Receiver: <br /> */}
            <select
              name="receiver"
              id="receiver"
              onChange={receiverChangeHandler}
            >
              <option selected disabled hidden>
                Choose Sender
              </option>
              {customers &&
                customers.map((customer) => (
                  <option value={customer.c_id}>
                    {customer.name} [Rs.{customer.balance}]
                  </option>
                ))}
            </select>
            <span className="custom-arrow"></span>
          </div>
          <br />
          <div>
            {/* Amount: <br /> */}
            <input
              type="text"
              placeholder="Rs."
              onChange={amountChangeHandler}
            />
          </div>
          <div className="transfer-btn">
            <button onClick={transactionHandler}>Transfer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transact;
