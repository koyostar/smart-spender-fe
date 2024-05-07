import React from "react";
import Statistics from "../../components/Statistics/Statistics";
import { getUser } from "../../utilities/users-service";

export default function Home() {
  return (
    <div>
      <div className="statistics">
        <h1>Hi {getUser().username}</h1>
        <Statistics />
      </div>
    </div>
  );
}
