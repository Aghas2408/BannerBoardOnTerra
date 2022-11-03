import { useState, useContext } from "react";
import Modal from "../../shared/Modal";
import Banner from "../../shared/Banner";
import Container from "../../shared/Container";
import { uploadImg } from "../../../assets/images";
import { ModalContext } from "../../../context/modalContext";

import "./styles.scss";

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
      <Modal>
        {openModal ? (
          <div className="upload-image-box">
            <div className="upload-information-box">
              <div className="upload-information">
                <img src={uploadImg} alt="#" className="icon-upload" />
                <p className="upload-title">Choose a file or drag it here</p>
                <p className="upload-subtitle">Max image size: 2MB</p>
              </div>
              <input
                className="upload-img"
                multiple
                type="file"
                name="myImage"
                onChange={handleCreateImageTag}
              />
            </div>
            <div className="text-information">
              <p>Recommended image size: 310x1080</p>
              <p>Acceptable formats: JPG, PNG, SVG</p>
            </div>
            <div className="btn-box">
              <button
                className="first-btn"
                onClick={() => setOpenModal(!openModal)}
              >
                CANCEL
              </button>
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
          <Banner className="right-section-banner" />
        </div>
      </Container>
    </div>
  );
}
