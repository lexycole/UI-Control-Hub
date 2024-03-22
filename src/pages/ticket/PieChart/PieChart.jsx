import React, { useState } from "react";
import "./PieChart.scss";
import usePieChart from "./usePieChart";
import TicketCard from "./TicketCard";

const PieChart = () => {
  const { tickets, padding, categoryInfo } = usePieChart();

  return (
    <div className="chart-container">
      <div
        className="custom-piechart"
        style={{ paddingBottom: padding.bottom }}
      >
        <ul className="indicators">
          {
            Object.keys(categoryInfo).map((key) => {
              const value = categoryInfo[key];
              return (
                <li>
                  <div style={{backgroundColor: value.color}}></div>
                  <span>{key}</span>
                </li>
              )
            })
          }
        </ul>
        <div
          className="piechart"
          style={{
            marginTop: padding.top,
          }}
        >
          <div className="piechart-top">
            {/* complaint pie */}
            <div className="pie-transform pie-transform-1"></div>
            {/* bug error pie */}
            <div className="pie-rest pie-rest-1"></div>
            {/* other pie */}
            <div className="pie-rest pie-rest-2"></div>
            {/* support pie */}
            <div className="pie-transform pie-transform-2"></div>
          </div>
          <div className="piechart-bottom">
            {/* disconnection pie */}
            <div className="pie-transform pie-transform-1"></div>
            {/* invoices pie */}
            <div className="pie-rest pie-rest-1"></div>
            {/* feature-request pie */}
            <div className="pie-rest pie-rest-2"></div>
            {/* orders pie */}
            <div className="pie-transform pie-transform-2"></div>
          </div>

          {/* Tickets on top of the pies */}
          {Object.keys(tickets)?.map((category, i) => {
            let categoryTickets = tickets[category];
            return (
              <div className={`tickets-container ${category}-tickets`} key={i}>
                {categoryTickets?.map((ticket, i) => {
                  return (
                    <TicketCard
                      title={ticket.name}
                      message={ticket.narrative}
                      userName={ticket.user?.username}
                      userImg={ticket.user?.imageSrc}
                      category={ticket.category}
                      status={ticket.status}
                      priority={ticket.priority}
                      key={i}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
