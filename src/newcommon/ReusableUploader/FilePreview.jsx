import React, { useState } from "react";
import { Card, CardBody, CardGroup, CardImg, CardText } from "reactstrap";
import { IconButton } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { apiUrl } from "../../config/config.json";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function FilePreview({
  setMessage,
  handleClick,
  handleDelete,
  files,
}) {
  const [sliderRef, setSliderRef] = useState(null)
  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
         slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
         slidesToShow: 1,
        }
       }
    ]
  }

  return (
    <div style={{ position: "relative" }}>
      <IconButton
        style={{
          position: "absolute",
          top: "60px",
          left: "-35px",
          cursor: "pointer",
          zIndex: "999px",
        }}
        onClick={sliderRef?.slickPrev}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        style={{
          position: "absolute",
          top: "60px",
          right: "-35px",
          cursor: "pointer",
          zIndex: "999px",
        }}
        onClick={sliderRef?.slickNext}
      >
        <ArrowForward />
      </IconButton>
      <Slider ref={setSliderRef} {...sliderSettings}>
        {files?.map((file, index) => (
          <Card key={index} >
            {file.fileType?.indexOf("image/") > -1 ? (
              <CardImg
                top
                src={`${apiUrl}/${file.filePath}`}
                alt="image"
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
                {file.fileType?.indexOf("application/pdf") > -1 ? (
                  <i className={`fas fa-file-pdf fa-lg`}></i>
                ) : file.fileType?.indexOf("spreadsheetml.sheet") > -1 ? (
                  <i className={`fas fa-file-excel fa-lg`}></i>
                ) : file.fileType?.indexOf("wordprocessingml.document") > -1 ? (
                  <i className={`fas fa-file-word fa-lg`}></i>
                ) : (
                  <i className={`fas fa-file fa-lg`}></i>
                )}
              </div>
            )}
            <IconButton
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                cursor: "pointer",
                fontWeight: "bolder",
                backgroundColor: "#FEB2B2",
                fontSize: "1rem",
              }}
              onClick={() => {
                handleDelete(file.filePath);
                setMessage("File Deleted Successfully!");
                handleClick();
              }}
            >
              <Delete />
            </IconButton>
            <CardBody style={{ background: "#ededed", textAlign: "center" }}>
              <CardText as="h1">{file.fileName}</CardText>
            </CardBody>
          </Card>
        ))}
      </Slider>
    </div>
  );
}