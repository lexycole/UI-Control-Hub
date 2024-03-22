import React, { useLayoutEffect, useRef, useState } from "react";
import FishboneChart from "fishbone-chart";
import { Panel, PanelBody } from "../../../components/panel/panel";
export default function Fishbone() {
  const fishboneRef = useRef(null);
  //   console.log(
  //     fishboneRef?.current?._reactInternals?.child?.child?.child?.child
  //   );
  //   console.log(fishboneRef?.current?.children);
  const [causes] = useState({
    "Bad Coffee 1": {
      process: ["Too much water", "Too many grounds", "Lack of training"],
      environment: ["Dirty cups", "Coffee not hot enough", "Dirty basket"],
      methods: ["Bad sugar", "Lids do not fit cup", "Bad cream"],
      people: ["Wrong fee", "No training", "Rude"],
      equipment: ["Not working", "Deregulated", "Dirty"],
      materials: ["Not working", "Deregulated", "Dirty"],
    },
    "Bad Coffee 2": {
      process: ["Too much water", "Too many grounds", "Lack of training"],
      environment: ["Dirty cups", "Coffee not hot enough", "Dirty basket"],
      methods: ["Bad sugar", "Lids do not fit cup", "Bad cream"],
      people: ["Wrong fee", "No training", "Rude"],
      equipment: ["Not working", "Deregulated", "Dirty"],
      materials: ["Not working", "Deregulated", "Dirty"],
    },
    "Bad Coffee 3": {
      process: ["Too much water", "Too many grounds", "Lack of training"],
      environment: ["Dirty cups", "Coffee not hot enough", "Dirty basket"],
      methods: ["Bad sugar", "Lids do not fit cup", "Bad cream"],
      people: ["Wrong fee", "No training", "Rude"],
      equipment: ["Not working", "Deregulated", "Dirty"],
      materials: ["Not working", "Deregulated", "Dirty"],
    },
    "Bad Coffee 4": {
      process: ["Too much water", "Too many grounds", "Lack of training"],
      environment: ["Dirty cups", "Coffee not hot enough", "Dirty basket"],
      methods: ["Bad sugar", "Lids do not fit cup", "Bad cream"],
      people: ["Wrong fee", "No training", "Rude"],
      equipment: ["Not working", "Deregulated", "Dirty"],
      materials: ["Not working", "Deregulated", "Dirty"],
    },
  });

  useLayoutEffect(() => {
    let causeElements = document.getElementsByClassName("cause");
    for (let i = 0; i < causeElements.length; i++) {
      if (causeElements[i].innerText === "process") {
        causeElements[i].style.backgroundColor = "#8411E999";
        causeElements[i].style.borderColor = "#8411E9";
        causeElements[i].style.color = "black";
      } else if (causeElements[i].innerText === "environment") {
        causeElements[i].style.backgroundColor = "#E911DB99";
        causeElements[i].style.borderColor = "#E911DB";
        causeElements[i].style.color = "black";
      } else if (causeElements[i].innerText === "methods") {
        causeElements[i].style.backgroundColor = "#1F11E999";
        causeElements[i].style.borderColor = "#1F11E9";
        causeElements[i].style.color = "black";
      } else if (causeElements[i].innerText === "people") {
        causeElements[i].style.backgroundColor = "#11E9BE99";
        causeElements[i].style.borderColor = "#11E9BE";
        causeElements[i].style.color = "black";
      } else if (causeElements[i].innerText === "equipment") {
        causeElements[i].style.backgroundColor = "#11E93C99";
        causeElements[i].style.borderColor = "#11E93C";
        causeElements[i].style.color = "black";
      } else if (causeElements[i].innerText === "materials") {
        causeElements[i].style.backgroundColor = "#11A8E999";
        causeElements[i].style.borderColor = "#11A8E9";
        causeElements[i].style.color = "black";
      }
    }
    let fishbone = document.getElementsByClassName("fishboneChart");
    console.log(fishbone);
    let legend = fishbone[0].childNodes[2];
    console.log(legend);
    legend.style.display = "none";
  }, []);

  return (
    <Panel>
      <PanelBody className="fishbone-container">
        <div classnames="fisshbone-container">
          <FishboneChart ref={fishboneRef} data={causes} />
        </div>
      </PanelBody>
    </Panel>
  );
}
