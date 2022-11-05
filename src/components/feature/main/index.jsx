import { useState, useContext } from "react";
import Modal from "../../shared/Modal";
import Banner from "../../shared/Banner";
import Container from "../../shared/Container";
import { emptyImg, uploadImg } from "../../../assets/images";
import { ModalContext } from "../../../context/modalContext";

import "./styles.scss";
import ProgressBar from "../../shared/ProgressBar";
import { closeX } from "../../../assets/icons";
import Button from "../../shared/Button";

const initialBannersData = [
  { bannerClassName: "top-banner" },
  { bannerClassName: "first-banner" },
  { bannerClassName: "second-banner" },
  { bannerClassName: "middle-banner" },
  { bannerClassName: "middle-banner" },
  { bannerClassName: "second-banner" },
  { bannerClassName: "first-banner" },
];

export default function Main() {
  const { openModal, setOpenModal } = useContext(ModalContext);
  const [bannersData, setBannersData] = useState(initialBannersData);
  const [selectedBannerIndex, setSelectedBannerIndex] = useState();

  const handleCreateImageTag = (e) => {
    console.log(e);
    const bannerFields = bannersData[selectedBannerIndex];
    bannerFields.file = e.target.files[0];

    const inputsDataNextState = [
      ...bannersData.slice(0, selectedBannerIndex),
      {
        ...bannerFields,
      },
      ...bannersData.slice(selectedBannerIndex + 1, bannersData.length),
    ];
    setBannersData(inputsDataNextState);
  };

  return (
    <div className="main-container">
      <Modal modalTitle="Add a Banner">
        {openModal ? (
          <div className="upload-image-box">
            <div className="upload-information-box">
              <div className="upload-information">
                <img src={uploadImg} alt="#" className="icon-upload" />
                <p className="upload-title">Choose a file or drag it here</p>
                <p className="upload-subtitle">Max image size: 2MB</p>
              </div>
              <label htmlFor="upload-img-label" className="upload-img">
                <input
                  id="upload-img-label"
                  multiple
                  type="file"
                  name="myImage"
                  title="asdsdaasd"
                  onChange={handleCreateImageTag}
                />
              </label>
            </div>
            <div className="text-information">
              <p>Recommended image size: 310x1080</p>
              <p>Acceptable formats: JPG, PNG, SVG</p>
            </div>
            <div className="progress-container">
              <img src={emptyImg} alt="#" />
              <ProgressBar progresstext={90} />
              <div>
                <img src={closeX} alt="#" />
              </div>
            </div>
            <div className="choosen-radios-box">
              <p className="choosen-title">
                Choose amount of time you want your banner to be displayed
              </p>
              <div className="choosen-radios">
                <label htmlFor="time12">
                  <input type="radio" id="time12" name="selectTime" />
                  12h
                </label>
                <label htmlFor="time24">
                  <input type="radio" id="time24" name="selectTime" />
                  24h
                </label>
              </div>
            </div>
            <div className="btn-box">
              <Button
                buttonLabel="Cancel"
                buttonStyle="first-btn"
                onClickButton={() => setOpenModal(!openModal)}
              />
              <Button
                buttonStyle="first-btn second-btn"
                buttonLabel={`Add for ${"$105"}`}
              />
            </div>
          </div>
        ) : null}
      </Modal>
      <Container className="banners-box">
        <div className="first-banners-inner">
          {bannersData.map(({ bannerClassName, file }, index) => {
            const includeFile = file && typeof file === "object" && file;
            return (
              <Banner
                key={index}
                className={bannerClassName}
                onBannerClick={() => setSelectedBannerIndex(index)}
                children={
                  includeFile && (
                    <img
                      alt="#"
                      className="banner-image"
                      src={URL.createObjectURL(file)}
                    />
                  )
                }
              />
            );
          })}
        </div>
        <div className="second-banners-inner">
          <Banner className="right-section-banner" children={<></>} />
        </div>
      </Container>
    </div>
  );
}
