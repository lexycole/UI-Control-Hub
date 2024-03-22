import React, { useState, useEffect } from "react";
import { TreeView, TreeItem } from "@material-ui/lab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const handleCheckbox = (checkbox) =>{
  var checkboxes = document.getElementsByName('check')

  checkboxes.forEach((item) => {
      if (item.value !== checkbox) item.checked = false
      else {console.log(checkbox)}
  })
}

const COAsTree = ({ coas, coavalues, handleCheckboxClick }) => {
  const [treeCoas, setTreeCoas] = useState({});
  const [active, setActive] = useState(-1)
  function Color(cat){
    const val = coavalues.filter(v=>v.value === cat)
    return val && val[0] && val[0].color? val && val[0] && val[0].color : "#DED99F"
   // return val
  }


  useEffect(() => {
    let acc = {};
    coas.map((cs) => {
      let categoryCode = cs.code[0] + cs.code[1];
      let subCategoryCode = cs.code[2] + cs.code[3];

      let cat = cs.category;
      let scat = cs.subCategory;
      if (!acc[cat]) {
        acc[cat] = {
          name: cat,
          code: categoryCode,
          subCategories: {},
        };
      }
      if (!acc[cat].subCategories[scat]) {
        acc[cat].subCategories[scat] = {
          name: scat,
          code: subCategoryCode,
          entries: [],
        };
      }
      acc[cat].subCategories[scat].entries.push({
        balance_type: cs.balance_type,
        clinic_id: cs.clinic_id,
        code: cs.code,
        created_on: cs.created_on,
        deleted_on: cs.deleted_on,
        description: cs.description,
        name: cs.name,
        normal_contra: cs.normal_contra,
        subCategory: cs.subCategory,
        _id: cs._id,
      });
    });
    setTreeCoas(acc);
  }, [coas]);
  // useEffect(() => {
  //   // console.log(treeCoas);
  //   Object.keys(treeCoas).map((tc) => {
  //     Object.keys(treeCoas[tc].subCategories).map((tsc, idx) =>
  //       // console.log(tsc, idx)
  //       treeCoas[tc].subCategories[tsc].entries
  //         .sort(
  //           (a, b) =>
  //             Number(a.code[5] + a.code[6] + a.code[7]) -
  //             Number(b.code[5] + b.code[6] + b.code[7])
  //         )
  //         .map((coa, idxs) => console.log(coa, idxs))
  //     );
  //   });
  // }, [treeCoas]);

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {Object.keys(treeCoas).map((tc, id) =>{
      return(
        <TreeItem
        // alert success
          className="alert alert-success p-2 m-2"
          nodeId={treeCoas[tc].code}
          label={`${treeCoas[tc].code} ${tc}`}
          key={id}
          style={{
             background: Color(tc)
          }}
          onClick={()=>{setActive(id)}}
        >
          {Object.keys(treeCoas[tc].subCategories).map((tsc, idx) => (
            <TreeItem
              className="alert alert-primary p-2 m-2"
              nodeId={treeCoas[tc].code + treeCoas[tc].subCategories[tsc].code}
              label={`${treeCoas[tc].subCategories[tsc].code} ${tsc}`}
              key={idx}
            >
              {treeCoas[tc].subCategories[tsc].entries
                .sort(
                  (a, b) =>
                    Number(a.code[4] + a.code[5] + a.code[6]) -
                    Number(b.code[4] + b.code[5] + b.code[6])
                )
                .map((coa, idxs) => (
                  <TreeItem
                    className="alert alert-dark p-2 m-2"
                    key={idxs}
                    nodeId={
                      treeCoas[tc].code +
                      treeCoas[tc].subCategories[tsc].code +
                      coa.code[4] +
                      coa.code[5] +
                      coa.code[6]
                    }
                    label={
                      <div className="p-1 d-flex flex-row justify-content-between align-items-center">
                        <p>
                          <input
                            type="checkbox"
                            name="check"
                            style={checkboxStyles}
                            // onChange={handleCheckboxChange}
                           value={coa._id}            
                          onClick={()=>{handleCheckboxClick(coa._id); handleCheckbox(coa._id)}}
                        />
                          {coa.code[4]}
                          {coa.code[5]}
                          {coa.code[6]}
                          {" - "}
                          {coa.name}
                        </p>
                      </div>
                    }
                  />
                ))}
            </TreeItem>
          ))}
        </TreeItem>)
      }
      )
      }
    </TreeView>
  );
};

const checkboxStyles = {
  width: "15px",
  height: "15px",
  marginTop: "0.4rem",
  marginRight: "15px",
  borderRadius: 0,
};
export default COAsTree;