import react, { useState, useEffect} from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";



const Customers = ({ firestore }) => {

  const customersRef = firestore.collection("customers");
  const query = customersRef;
  const [customers] = useCollectionData(query);


  return (
    <div className="Customers">
      <div className="container">
        <h1>List of all customers</h1>
        <table>
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Account Balance</th>
            </tr>
          </thead>
          <tbody>
            {customers && customers.map((customer) => (
              <tr>
                <td>{customer.c_id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
