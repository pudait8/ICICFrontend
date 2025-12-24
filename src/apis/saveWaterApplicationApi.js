import conf from "../config";
import axios from "axios";

const saveWaterApplicationApi = async (params) => {
  const response = await axios({
    method: "post",
    url: `${conf.api.base_url}Gateway_PostAuthPortalService/GetData`,
    data: {
      ApiKey: "SaveWaterApplicationData",
      OrgId: params.OrgId,
      ApiParams: {
        ApplicationType: params.ApplicationType,
        PropertyRefId: params.PropertyRefId,
        Name: params.Name,
        LandlineNo: "",
        IdType: 0,
        IdDetail: "",
        Mobile: "0",
        EmailId: "",
        ApplicationDetail: params.Remark,
        GPASPA: params.GPASPA,
        IPin: params.IPin,
        ReturnURL: params.ReturnURL,
        BussinessFirstApplId: params.BussinessFirstApplId,
        GstNo: "",
        TemporaryApplicationId: params.TemporaryApplicationId,
        OwnerId: params.OwnerId,
        AppointmentDate: params.AppointmentDate,
        WheatherBuildingIs: params.WheatherBuildingIs,
        NoOfFloorConstructed: params.NoOfFloorConstructed,
        IsBasmentConstruct: params.IsBasmentConstruct,
        BuildingPlanSanctionDate: params.BuildingPlanSanctionDate,
        PlumberName: params.PlumberName,
        PlumberLicenseNumber: params.PlumberLicenseNumber,
        PlumberAddress: params.PlumberAddress,
        CerificateIssueDate: params.CerificateIssueDate,
        NumberOfSeats: params.NumberOfSeats,
        SeatsGroundFloor: params.SeatsGroundFloor,
        SeatsFirstFloor: params.SeatsFirstFloor,
        SeatsSecondFloor: params.SeatsSecondFloor,
        ServicePipeLineLength: params.ServicePipeLineLength,
        ServicePipeLineSize: params.ServicePipeLineSize,
        NumberOfTap: params.NumberOfTap,
        SizeOfTap: params.SizeOfTap,
        FerrulCockSize: params.FerrulCockSize,
        SanaitaryMaterialsDtl: params.SanaitaryMaterialsDtl,
        HotWaterFittingDtl: params.HotWaterFittingDtl,
        PurposeOfConnection: params.PurposeOfConnection,
        AreaMumty: params.AreaMumty,
        IsMumtyConstructed: params.IsMumtyConstructed,
        AreaGroundFloor: params.AreaGroundFloor,
        AreaFirstFloor: params.AreaFirstFloor,
        AreaSecondFloor: params.AreaSecondFloor,
        ConstructionCost: params.ConstructionCost,
        MeterNumber: params.MeterNumber,
        MeterMakeAndModel: params.MeterMakeAndModel,
        InstallationDate: params.InstallationDate,
        MeterBillNumber: params.MeterBillNumber,
        MeterWarrantyYears: params.MeterWarrantyYears,
        HotWaterFittingBillNo: params.HotWaterFittingBillNo,
        AreaBasment: params.AreaBasment,
      },
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      AuthToken: params.AuthToken,
      AuthTokenKey: params.AuthTokenKey,
    },
  });

  return response;
};

export default saveWaterApplicationApi;
