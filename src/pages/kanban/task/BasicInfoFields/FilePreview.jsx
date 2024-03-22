import React from "react";
import { Card, CardBody, CardGroup, CardImg, CardText } from "reactstrap";

export default function FilePreview({ selectedFile, removeFile }) {
  let assets=[];

      if(selectedFile?.length>0){
      for (let x = 0; x < selectedFile.length; x++) {
        assets[x]={name:selectedFile[x]?.name,type:selectedFile[x]?.type,link:URL.createObjectURL(selectedFile[x])}
      }}
     
  return (
    <CardGroup className="d-flex flex-wrap">
      {assets?.map((asset, id) => (
        <Card key={id} className="m-3" style={{maxWidth:"220px"}}>
          {asset.type.indexOf("image/")>-1 ? (
            <CardImg
              top
              src={asset?.link}
              style={{
                height: "150px",
                objectFit: "cover",
                position: "relative",
              }}
            />
          ) : (
            <div
              style={{ height: "150px" }}
              className="d-flex justify-content-center align-items-center"
            >
              {asset.type.indexOf("application/pdf")>-1? (
                <i className={`fas fa-file-pdf fa-lg`}></i>
              ):
              asset?.type.indexOf("spreadsheetml.sheet")>-1 ? (
                <i className={`fas fa-file-excel fa-lg`}></i>
              ):
               asset?.type.indexOf("wordprocessingml.document")>-1 ? (
                <i className={`fas fa-file-word fa-lg`}></i>
              ): (
                <i className={`fas fa-file fa-lg`}></i>
              )}
            </div>
          )}
          <i
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              cursor: "pointer",
            }}
            className={`fas fa-trash-alt fa-lg m-4`}
            onClick={()=>{
              let arr=[...selectedFile];
              arr.splice(id,1)
              URL.revokeObjectURL(asset?.link);
              removeFile(arr)
            }}
          ></i>
          <CardBody style={{ background: "#ededed", textAlign: "center" }}>
            <CardText as="h1">{asset?.name}</CardText>
          </CardBody>
        </Card>
      ))}
    </CardGroup>
  );
}
