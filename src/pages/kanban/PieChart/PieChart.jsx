import React from "react";
import "./PieChart.scss";
import { Polar } from "react-chartjs-2";

import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryPie,
  VictoryBar,
  VictoryStack,
} from "victory";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
const PieChart = () => {
  let data = [
    { x: "bug-error", y: 1 },
    { x: "complaint", y: 1 },
    { x: "disconnection", y: 1 },
    { x: "invoices", y: 1 },
    { x: "feature-request", y: 1 },
    { x: "orders", y: 1 },
    { x: "support", y: 1 },
    { x: "other", y: 1 },
  ];
  const polarAreaChart = {
    data: {
      labels: ["Dataset 1", "Dataset 2", "Dataset 3", "Dataset 4", "Dataset 5"],
      datasets: [
        {
          data: [300, 160, 100, 200, 120],
          backgroundColor: [
            "rgba(114, 124, 182, 0.7)",
            "rgba(52, 143, 226, 0.7)",
            "rgba(0, 172, 172, 0.7)",
            "rgba(182, 194, 201, 0.7)",
            "rgba(45, 53, 60, 0.7)",
          ],
          borderColor: ["#727cb6", "#348fe2", "#00ACAC", "#b6c2c9", "#2d353c"],
          borderWidth: 2,
          label: "My dataset",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };
  return (
    <div className="chart-container">
      <VictoryChart polar>
        {data?.map((d, i) => (
          <VictoryPolarAxis
            key={i}
            label={d?.x}
            axisValue={d?.x}
            labelPlacement="perpendicular"
            style={{ tickLabels: { fill: "none" } }}
          />
        ))}
        <VictoryStack>
          <VictoryBar
            style={{ data: { fill: "tomato", width: 35 } }}
            data={data}
          />
          <VictoryBar
            style={{ data: { fill: "red", width: 35 } }}
            data={data}
          />
        </VictoryStack>
      </VictoryChart>
      <VictoryPie
        colorScale={["black", "navy", "blue"]}
        style={{ labels: { fill: "white", fontSize: 10 } }}
        labelRadius={80}
        data={data}
      />
      <VictoryPie
        style={{ labels: { fill: "white", fontSize: 10 } }}
        innerRadius={80}
        labelRadius={80}
        data={data}
      />
      <VictoryPie
        style={{ labels: { fill: "white", fontSize: 10 } }}
        innerRadius={160}
        labelRadius={80}
        data={data}
      />
      <Panel>
        <PanelHeader noButton>Polar Area Chart</PanelHeader>
        <PanelBody>
          <Polar
            data={polarAreaChart?.data}
            options={polarAreaChart?.options}
          />
        </PanelBody>
      </Panel>
    </div>
  );
};

export default PieChart;
