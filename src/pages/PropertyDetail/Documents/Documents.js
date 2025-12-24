import React, { useState, useEffect } from "react";
import PropsTypes from "prop-types";
import { CaretRightOutlined, FileImageFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import Lottie from "react-lottie";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Container,
  PDFBotton,
  PDFBottonPTag,
  PDFButton,
} from "./DocumentsStyle";
import { Xcollapse, BlueButton } from "../../../components/Xcomponents";
import ScrollBox from "../../../components/ScrollBox";
import { getMyDocumentsList } from "../../../actions/getMyDocumentsListAction";
import {
  BackIcon,
  DocumentIcon,
  RightIconPDF,
  BackIconPDF,
  ZoomInIcon,
  ZoomOutIcon,
  LeftRotatePDF,
  RightRotatePDF,
} from "../../../components/CustomIcons";
import conf from "../../../config";
import StatusCard from "../../../components/StatusCard/StatusCard";
import RowListSkeleton from "../../../components/RowListSkeleton/RowListSkeleton";
import RowList from "../../../components/RowList/RowList";
import FlexBar from "../../../components/FlexBar/FlexBar";
import folderAnimation from "../../../Lottie/folder-animation.json";

const Documents = (props) => {
  const { getMyDocumentsList, getMyDocumentsListState } = props;
  const [referesh, setRefresh] = useState(0);
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [pdfViewUrl, setPdfViewUrl] = useState("");
  // const [pdfPage, setPdfPage] = useState(1);
  // const [rotation, setRotation] = useState(0);
  // const [height, setHeight] = useState(600);
  // const [width, setWidth] = useState(600);

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
  useEffect(() => {
    getMyDocumentsList({
      PropertyRefId: props.id,
      OrgId: props.org,
      AuthToken: props.AuthToken,
      AuthTokenKey: props.AuthTokenKey,
    });
  }, [referesh]);

  let randomColors = ["#c4e56d", "#e59b6d", "#b1e7ff"];

  const DownloadFile = (DocumentId, FileName) => {
    fetch(
      `${conf.api.base_url}DMS_DocumentService/GetUploadedDocument?ApiKey=GetUploadDocument&OrgId=${props.org}&DocumentId=${DocumentId}`,
      {
        method: "POST",
        headers: {
          AuthToken: props.AuthToken,
          AuthTokenKey: props.AuthTokenKey,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.blob();
        } else {
          return null;
        }
      })
      .then((blob) => {
        if (blob) {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = FileName;
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();
          a.remove(); //afterwards we remove the element again
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const DownloadIssuedFile = (DocumentId, FileName) => {
    fetch(
      `${conf.api.base_url}DMS_DocumentService/GetIssuedDocument?ApiKey=GetIssuedDocument&OrgId=${props.org}&IssuedDocumentId=${DocumentId}`,
      {
        method: "POST",
        headers: {
          AuthToken: props.AuthToken,
          AuthTokenKey: props.AuthTokenKey,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.blob();
        } else {
          return null;
        }
      })
      .then((blob) => {
        if (blob) {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = FileName;
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();
          a.remove(); //afterwards we remove the element again
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };
  // const ViewFile = (DocumentId, FileName) => {
  //   fetch(
  //     `${conf.api.base_url}DMS_DocumentService/GetPropertyDocument?ApiKey=GetPropertyDocument&OrgId=${props.org}&PropDocumentId=${DocumentId}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         AuthToken: props.AuthToken,
  //         AuthTokenKey: props.AuthTokenKey,
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       if (res.status === 200) {
  //         return res.blob();
  //       } else {
  //         return null;
  //       }
  //     })
  //     .then((blob) => {
  //       if (blob) {
  //         var url = window.URL.createObjectURL(blob);
  //         // console.log("hello", url)
  //         setPdfViewUrl(url);
  //         // var a = document.createElement("a");
  //         // a.href = url;
  //         // a.download = FileName;
  //         // document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
  //         // a.click();
  //         // a.remove(); //afterwards we remove the element again
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const DownloadLOIFile = (DocumentId, FileName) => {
    fetch(
      `${conf.api.base_url}DMS_DocumentService/GetLOIDocument?ApiKey=GetLOIDocument&OrgId=${props.org}&IssuedDocumentId=${DocumentId}`,
      {
        method: "POST",
        headers: {
          AuthToken: props.AuthToken,
          AuthTokenKey: props.AuthTokenKey,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.blob();
        } else {
          return null;
        }
      })
      .then((blob) => {
        if (blob) {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = FileName;
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();
          a.remove(); //afterwards we remove the element again
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const folderAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: folderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <ScrollBox>
      <Xcollapse
        defaultActiveKey={["1", "2", "3", "4"]}
        ghost
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Xcollapse.Panel header="Document Issued" key="1">
          {getMyDocumentsListState.apiState === "loading" && (
            <RowListSkeleton rows={10} />
          )}

          {getMyDocumentsListState.issuedCount === 0 && (
            <FlexBar
              leftContent={
                <>
                  <Lottie
                    options={folderAnimationOptions}
                    height={80}
                    width={80}
                  />
                  <span>No document issued.</span>
                </>
              }
            />
          )}

          {getMyDocumentsListState.apiState === "success"
            ? [
                getMyDocumentsListState.issuedList.map((item) => (
                  <a
                    onClick={() =>
                      DownloadIssuedFile(item.IssuedDocumentId, item.FileName)
                    }
                  >
                    <RowList
                      img={<DocumentIcon />}
                      iconBg={
                        randomColors[~~(randomColors.length * Math.random())]
                      }
                      title={item.DocumentType}
                      subTitles={[
                        item.ApplicationType + ".",
                        item.UploadedOn + ".",
                        "#" + item.ApplicationNo,
                      ]}
                      contentOnHover={"Download"}
                    />
                  </a>
                )),
              ]
            : null}

          {getMyDocumentsListState.apiState === "error" && (
            <StatusCard
              title="Something is not right"
              action={
                <BlueButton onClick={() => setRefresh(referesh + 1)}>
                  Try Again
                </BlueButton>
              }
            />
          )}
        </Xcollapse.Panel>
        <Xcollapse.Panel header="Document Uploaded" key="2">
          {getMyDocumentsListState.apiState === "loading" && (
            <RowListSkeleton rows={10} />
          )}

          {getMyDocumentsListState.uploadedCount === 0 && (
            <FlexBar
              leftContent={
                <>
                  <Lottie
                    options={folderAnimationOptions}
                    height={80}
                    width={80}
                  />
                  <span>No document uploaded.</span>
                </>
              }
            />
          )}

          {getMyDocumentsListState.apiState === "success"
            ? [
                getMyDocumentsListState.uploadedList.map((item) => (
                  <a
                    onClick={() => DownloadFile(item.DocumentId, item.FileName)}
                  >
                    <RowList
                      img={<DocumentIcon />}
                      iconBg={
                        randomColors[~~(randomColors.length * Math.random())]
                      }
                      title={item.DocumentType}
                      subTitles={[
                        item.ApplicationType + ".",
                        item.UploadedOn + ".",
                        "#" + item.ApplicationNo,
                      ]}
                      contentOnHover={"Download"}
                    />
                  </a>
                )),
              ]
            : null}

          {getMyDocumentsListState.apiState === "error" && (
            <StatusCard
              title="Something is not right"
              action={
                <BlueButton onClick={() => setRefresh(referesh + 1)}>
                  Try Again
                </BlueButton>
              }
            />
          )}
        </Xcollapse.Panel>
        <Xcollapse.Panel header="LOI/Allotment" key="3">
          {getMyDocumentsListState.apiState === "loading" && (
            <RowListSkeleton rows={10} />
          )}

          {getMyDocumentsListState.loiDocumentsCount === 0 && (
            <FlexBar
              leftContent={
                <>
                  <Lottie
                    options={folderAnimationOptions}
                    height={80}
                    width={80}
                  />
                  <span>No document uploaded.</span>
                </>
              }
            />
          )}

          {getMyDocumentsListState.apiState === "success"
            ? [
                getMyDocumentsListState.loiDocuments.map((item) => (
                  <a
                    onClick={() =>
                      DownloadLOIFile(item.IssuedDocumentId, item.FileName)
                    }
                  >
                    <RowList
                      img={<DocumentIcon />}
                      iconBg={
                        randomColors[~~(randomColors.length * Math.random())]
                      }
                      title={item.DocumentType}
                      subTitles={[
                        item.ApplicationType + ".",
                        item.UploadedOn + ".",
                        "#" + item.ApplicationNo,
                      ]}
                      contentOnHover={"Download"}
                    />
                  </a>
                )),
              ]
            : null}

          {getMyDocumentsListState.apiState === "error" && (
            <StatusCard
              title="Something is not right"
              action={
                <BlueButton onClick={() => setRefresh(referesh + 1)}>
                  Try Again
                </BlueButton>
              }
            />
          )}
        </Xcollapse.Panel>
        {/* <Xcollapse.Panel header="Property Documents" key="4">
          {getMyDocumentsListState.apiState === "loading" && (
            <RowListSkeleton rows={10} />
          )}

          {getMyDocumentsListState.propertyCount === 0 && (
            <FlexBar
              leftContent={
                <>
                  <Lottie
                    options={folderAnimationOptions}
                    height={80}
                    width={80}
                  />
                  <span>No document uploaded.</span>
                </>
              }
            />
          )}

          {getMyDocumentsListState.apiState === "success"
            ? [
                getMyDocumentsListState.propertyDocuments.map((item) => (
                  <a
                    onClick={() => ViewFile(item.PropDocumentId, item.FileName)}
                  >
                    <RowList
                      img={<DocumentIcon />}
                      iconBg={
                        randomColors[~~(randomColors.length * Math.random())]
                      }
                      title={item.DocumentType}
                      subTitles={[
                        item.ApplicationType + ".",
                        item.UploadedOn + ".",
                        "#" + item.ApplicationNo,
                      ]}
                      contentOnHover={"View"}
                    />
                  </a>
                )),
              ]
            : null}

          {getMyDocumentsListState.apiState === "error" && (
            <StatusCard
              title="Something is not right"
              action={
                <BlueButton onClick={() => setRefresh(referesh + 1)}>
                  Try Again
                </BlueButton>
              }
            />
          )}
        </Xcollapse.Panel> */}
      </Xcollapse>
      {/* {pdfViewUrl && (
        <div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              flex: 1,
              backgroundColor: "#006fc3",
              height: 40,
              marginLeft: 80,
              marginRight: 80,
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <PDFButton
                disabled={height === 300}
                onClick={() => {
                  setHeight(height - 50);
                  setWidth(width - 50);
                }}
              >
                <ZoomOutIcon />
              </PDFButton>
              <PDFButton
                onClick={() => {
                  setHeight(height + 50);
                  setWidth(width + 50);
                }}
              >
                <ZoomInIcon />
              </PDFButton>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <PDFButton onClick={() => setRotation(rotation + 90)}>
                <LeftRotatePDF />
              </PDFButton>
              <PDFButton onClick={() => setRotation(rotation - 90)}>
                <RightRotatePDF />
              </PDFButton>
            </div>
            <div style={{ display: "flex" }}>
              <button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                  borderRadius: 5,
                  padding: 8,
                  marginTop: 2,
                  backgroundColor: "white",
                  marginBottom: 2,
                }}
                onClick={() => setPageNumber(Number(pdfPage))}
              >
                Goto Page
              </button>
              <input
                style={{
                  width: 50,
                  borderRadius: 5,
                  borderWidth: 5,
                  paddingLeft: 5,
                }}
                value={pdfPage}
                onChange={(event) => setPdfPage(event.target.value)}
              />
            </div>
            <PDFBotton>
              <PDFButton
                onClick={() => {
                  setPageNumber(pageNumber - 1);
                  setPdfPage(pageNumber - 1);
                }}
                disabled={pageNumber === 1}
              >
                <BackIconPDF />
              </PDFButton>
              <PDFBottonPTag>
                <p style={{ margin: 0, color: "white" }}>
                  Page {pageNumber} of {numPages}
                </p>
              </PDFBottonPTag>
              <PDFButton
                onClick={() => {
                  setPageNumber(pageNumber + 1);
                  setPdfPage(pageNumber + 1);
                }}
                disabled={pageNumber === numPages}
              >
                <RightIconPDF />
              </PDFButton>
            </PDFBotton>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Document
              file={pdfViewUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              rotate={rotation}
            >
              <Page pageNumber={pageNumber} height={height} width={width} />
            </Document>
          </div>
        </div>
      )} */}
    </ScrollBox>
  );
};

Documents.PropsTypes = {
  id: PropsTypes.string,
  org: PropsTypes.string,
  AuthToken: PropsTypes.string,
  AuthTokenKey: PropsTypes.string,
};

Documents.defaultProps = {
  id: null,
  org: null,
  AuthToken: null,
  AuthTokenKey: null,
};

const mapStateToProps = (state) => ({
  getMyDocumentsListState: state.getMyDocumentsList,
});

const mapDispatchToProps = (dispatch) => ({
  getMyDocumentsList: (params) => dispatch(getMyDocumentsList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
