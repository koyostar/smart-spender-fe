import React, { useState } from "react";
import CreateTabs from "../Tabs/CreateTabs";

export default function Transfer() {
  function handleChange() {}

  function handleSubmit() {}

  return (
    <div className="transfer-container font-bebas">
      <CreateTabs />
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Date:</label>
          <input
            type="date"
            name="Date"
            onChange={handleChange}
            required
          ></input>
          <br />
          <label>Amount</label>
          <input
            type="number"
            name="Amount"
            onChange={handleChange}
            required
          ></input>
          <br />
          <label>Expense</label>
          <br />
          <label>To</label>
          <br />
          <label>Description</label>
          <input type="text" name="Description" onChange={handleChange}></input>
          <div>
            <button type="submit">+ Transfer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
