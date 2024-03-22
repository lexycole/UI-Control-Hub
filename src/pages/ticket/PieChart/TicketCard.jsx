import React from "react";
import "./TicketCard.scss";
import usePieChart from "./usePieChart";

function TicketCard({
  title = "sample title",
  message = "Sample Message",
  userImg = "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
  userName = "Sample User",
  category = "disconnection",
  status = "pending",
  priority = "normal",
}) {
  const statusColors = {
    "in progress": "#38bdf8",
    new: "#333",
    pending: "#ef4444",
    archive: "#9ca3af",
  };
  const priorityColors = {
    low: "#6b7280",
    normal: "#22c55e",
    high: "#f97316",
    urgent: "#ef4444",
  };
  return (
    <article className="pie-ticket-card">
      {/* priority */}
      <div
        className="priority-ribbon"
        style={{ backgroundColor: priorityColors[priority] }}
      >
        <small>{priority}</small>
      </div>
      <main>
        <p className="title">{title}</p>
        <p className="message">{message}</p>
      </main>
      <header>
        <img src={userImg} alt="user profile image" />
        <p>{userName}</p>
      </header>
      <footer>
        <div className="category">
          <span>{category}</span>
        </div>
        <div
          style={{ backgroundColor: statusColors[status] }}
          className="status"
        >
          {status}
        </div>
      </footer>
    </article>
  );
}

export default TicketCard;
