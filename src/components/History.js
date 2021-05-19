import react, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";

const History = ({ firestore }) => {
  const historyRef = firestore.collection("history");
  const query = historyRef.orderBy("t_id");
  const [history] = useCollectionData(query);
  console.log(history);

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  return (
    <div className="History">
      <div className="container">
        <h1>All Transactions</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Transfer Amount</th>
              <th>Date/time</th>
            </tr>
          </thead>
          <tbody>
            {history &&
              history.map((transaction) => (
                <tr>
                  <td>{transaction.t_id}</td>
                  <td>{transaction.sender}</td>
                  <td>{transaction.receiver}</td>
                  <td>{transaction.transfer_amount}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
