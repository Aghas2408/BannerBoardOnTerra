import { useState, useContext } from "react";
import Timer from "../../shared/Timer";
import Modal from "../../shared/Modal";
import Banner from "../../shared/Banner";
import Button from "../../shared/Button";
import { closeX } from "../../../assets/icons";
import Container from "../../shared/Container";
import ProgressBar from "../../shared/ProgressBar";
import { emptyImg, uploadImg } from "../../../assets/images";
import { ModalContext } from "../../../context/modalContext";
import { INITIAL_BANNERS_DATA } from "../../../constants/bannersData";

import "./styles.scss";

export default function Main() {
  const { openModal, setOpenModal } = useContext(ModalContext);

  const [futureDate, setFutureDate] = useState();
  const [uploadFile, setUploadFile] = useState();
  const [bannerSize, setBannerSize] = useState();
  const [progressPercent, setProgressPercent] = useState(0);
  const [selectedOneBanner, setSelectedOneBanner] = useState();
  const [selectedBannerIndex, setSelectedBannerIndex] = useState();
  const [bannersData, setBannersData] = useState(INITIAL_BANNERS_DATA);

  const configureBannersData = (bannerField) => {
    const inputsDataNextState = [
      ...bannersData.slice(0, selectedBannerIndex),
      bannerField,
      ...bannersData.slice(selectedBannerIndex + 1, bannersData.length),
    ];
    setBannersData(inputsDataNextState);
  };

  const addTimeTimer = (e) => {
    const hours = e.target.id;
    let currentTime = new Date().getTime();
    let updatedTIme = new Date(currentTime + hours * 60 * 60 * 1000);
    setFutureDate(updatedTIme);
  };

  const addToBanner = () => {
    const bannerField = bannersData[selectedBannerIndex];
    bannerField.file = uploadFile;
    bannerField.timer = futureDate;
    bannerField.size = bannerSize;
    setSelectedOneBanner(bannerField);
    configureBannersData(bannerField);
  };

  const removeFileToBanner = () => {
    const bannerField = bannersData[selectedBannerIndex];
    const isBannerField = bannerField && typeof bannerField === "object";
    if (!isBannerField) return;
    setUploadFile("");
    bannerField.file = "";
    configureBannersData(bannerField);
    setProgressPercent(0);
  };

  const handleGetBannerSize = (event, index) => {
    const parrentOffsetInfo = {
      offsetHeight: event
        ? event.target.offsetParent.offsetParent.offsetHeight
        : 0,
      offsetWidth: event
        ? event.target.offsetParent.offsetParent.offsetWidth
        : 0,
    };
    setSelectedBannerIndex(index);
    setBannerSize(parrentOffsetInfo);
  };

  const handleUploadFile = (e) => {
    setProgressPercent(0);
    setTimeout(() => {
      const startTime = performance.now();
      setUploadFile(e.target.files[0]);
      const endTime = performance.now() + 1;
      const generalTime = endTime - startTime;
      const finishedProgressTime = (generalTime * 100) / new Date().getTime();
      setProgressPercent(Math.ceil(finishedProgressTime) * 100);
    }, 500);
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
                {uploadFile && (
                  <img src={URL.createObjectURL(uploadFile)} alt="" />
                )}
                <input
                  id="upload-img-label"
                  multiple
                  type="file"
                  name="myImage"
                  title="asdsdaasd"
                  onChange={handleUploadFile}
                />
              </label>
            </div>
            <div className="text-information">
              <p>Recommended image size: 310x1080</p>
              <p>Acceptable formats: JPG, PNG, SVG</p>
            </div>
            <div className="progress-container">
              <img src={emptyImg} alt="#" />
              <ProgressBar progressText={progressPercent} />
              <div onClick={removeFileToBanner}>
                <img src={closeX} alt="#" />
              </div>
            </div>
            <div className="choosen-radios-box">
              <p className="choosen-title">
                Choose amount of time you want your banner to be displayed
              </p>
              <div className="choosen-radios">
                <label htmlFor="time12" onChange={addTimeTimer}>
                  <input type="radio" id="12" name="selectTime" />
                  12h
                </label>
                <label htmlFor="time24" onChange={addTimeTimer}>
                  <input type="radio" id="24" name="selectTime" />
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
                onClickButton={addToBanner}
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
                className={`${bannerClassName} ${
                  selectedBannerIndex === index ? "active-banner" : ""
                }`}
                onBannerClick={(event) => handleGetBannerSize(event, index)}
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
          <Banner
            className="right-section-banner"
            children={
              <div
                className={`timer-box-hidden ${
                  selectedOneBanner ? "timer-box-show" : ""
                } `}
              >
                <Timer
                  futureDate={selectedOneBanner && selectedOneBanner.timer}
                />
                <div className="banners-size-info">
                  <p>
                    width:{" "}
                    {selectedOneBanner && selectedOneBanner.size.offsetWidth}px
                  </p>
                  <p>
                    height:{" "}
                    {selectedOneBanner && selectedOneBanner.size.offsetHeight}px
                  </p>
                </div>
              </div>
            }
          />
        </div>
      </Container>
    </div>
  );
}
