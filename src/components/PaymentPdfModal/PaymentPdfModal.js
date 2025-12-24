import React, { useEffect, useState } from "react";
import { Modal } from "antd";

// custom
import { DownloadIcon, EyeIcon } from "../CustomIcons";

// Style
import { Button, Div, H2, Span } from "./PaymentPdfModalStyle";
import { ReceiptColumn } from "./PaymentPdfModalStyle";

// utils
import { getOrgId } from "../../utils";

const PaymentPdfModal = ({ item, itemTwo, authorityList }) => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const OrgId = getOrgId();

  const data = itemTwo.CurrentOwners.map((item) => {
    return { Name: item.Name, Salutation: item.Salutation };
  });

  // This is used to set data for to show
  useEffect(() => {
    if (authorityList) {
      authorityList.list.map((item) => {
        if (item.Id === Number(OrgId)) {
          setImage(item.ImageURL);
          setName(item.Name);
          setAddress(item.OrgAddress);
          setEmail(item.EmailAddress);
        }
      }, []);
    }
  }, []);

  // This is used to print the format
  function printPage() {
    const printContent = document.getElementById("modal-content").innerHTML;
    const printWindow = window.open("", "PRINT", "height=400,width=600");

    printWindow.document.write("<html><head><title></title></head><body>");
    printWindow.document.write(
      `<style>@page { margin: 0; }</style>` // Set margin to 0
    );
    printWindow.document.write(
      `<div style="position: absolute; bottom: 0; left: 0;">${email}</div>`
    );
    printWindow.document.write("<div>" + printContent + "</div>");
    printWindow.document.write("</body></html>");

    printWindow.document.close();

    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };

    return true;
  }

  return (
    <>
      {item.PaymentMode === "Online Transaction" ? (
        <ReceiptColumn>
          <Button onClick={() => setVisible(true)}>
            <EyeIcon />
          </Button>
          <Button onClick={printPage}>
            <DownloadIcon />
          </Button>
        </ReceiptColumn>
      ) : (
        <></>
      )}
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        width={900}
      >
        <Div
          id="modal-content"
          style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}
        >
          <div style={{ flexDirection: "row", display: "flex" }}>
            <img src={image} style={{ width: 60, height: 90 }} />
            <Span
              style={{
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
                marginLeft: 20,
              }}
            >
              <h1 style={{ margin: 0 }}>{name}</h1>
              <h3 style={{ margin: 0 }}>{address}</h3>
            </Span>
          </div>
          <H2
            style={{
              textAlign: "center",
              display: "flex",
              flex: "1px",
              justifyContent: "center",
              fontWeight: "bold",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            e Receipt
          </H2>
          <table width={"100%"}>
            <tr>
              <td>Date</td>
              <td style={{ width: 100 }}>:</td>
              <td>{item.PaymentDate}</td>
            </tr>
            <tr>
              <td>Receipt No</td>
              <td style={{ width: 100 }}>:</td>
              <td>{item.PaymentDetail}</td>
            </tr>
            <tr>
              <td>Transaction No</td>
              <td style={{ width: 100 }}>:</td>
              <td>{item.PaymentDetail}</td>
            </tr>
            <tr>
              <td>Applicant Name</td>
              <td style={{ width: 100 }}>:</td>
              <td>{`${data[0].Salutation} ${data[0].Name}`}</td>
            </tr>
            <tr>
              <td>Property/Form No.</td>
              <td style={{ width: 100 }}>:</td>
              <td>{itemTwo.data.ProertyDetails.PlotNumber}</td>
            </tr>
            <tr>
              <td>Scheme</td>
              <td style={{ width: 100 }}>:</td>
              <td>{itemTwo.data.ProertyDetails.SchemeName}</td>
            </tr>
            <tr>
              <td>Amount</td>
              <td style={{ width: 100 }}>:</td>
              <td style={{ display: "flex", flexDirection: "row" }}>
                ₹{item.TotalAmount}
              </td>
            </tr>
            <tr>
              <td>Fee Type</td>
              <td style={{ width: 100 }}>:</td>
              <td>
                {item.PaymentHeadDetails.map((data, key) => (
                  <span key={key}>{`${data.HeadName}: ₹${data.HeadAmount}${
                    item.PaymentHeadDetails.length - 1 !== key ? "," : ""
                  }`}</span>
                ))}
              </td>
            </tr>
          </table>
        </Div>
      </Modal>
    </>
  );
};

export default PaymentPdfModal;
