import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useLazyGetMedicationInfoQuery } from "../services/medicationsApi";
import PatientIDInput from "./form_components/PatientID.tsx";
import { copy, linkIcon, loader, tick } from "../assets";

const Summary = () => {
  const [patientInfo, setPatientInfo] = useState({
    ID: "",
    Diagnosis: "",
    OtherDiagnosis: "",
    Description: "",
    Age: 18,
  });
  const [allPatientInfo, setAllPatientInfo] = useState([]);

  const [getMedicationInfo, { error, isFetching }] =
    useLazyGetMedicationInfoQuery();

  useEffect(() => {
    const patientInfoFromLocalStorage = JSON.parse(
      localStorage.getItem("patientInfos")
    );
    if (patientInfoFromLocalStorage) {
      setAllPatientInfo(patientInfoFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await getMedicationInfo("");

    if (data?.description) {
      const newDescription = { ...patientInfo, Description: data.description };

      const updatedAllPatientInfo = [newDescription, ...allPatientInfo];
      setPatientInfo(newDescription);

      console.log("Logged new description");
      setAllPatientInfo(updatedAllPatientInfo);

      localStorage.setItem(
        "patientInfos",
        JSON.stringify(updatedAllPatientInfo)
      );
    } else {
      console.log("No description came back");
    }
  };

  const handleDiagnosisChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Other") {
      setPatientInfo({
        ...patientInfo,
        Diagnosis: selectedValue,
      });
    } else {
      setPatientInfo({
        ...patientInfo,
        Diagnosis: selectedValue,
        OtherDiagnosis: "", // Reset the OtherDiagnosis value
      });
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* {search} */}
      <div className="flex flex-col w-full gap-2">
        {/* Display ID and Description */}
        <div className="my-1 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Well, that wasn't supposed to happen...
              <br />
              <span className="font-satoshi font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            patientInfo.Description && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm text-gray-700">
                    <label
                      htmlFor="ageInput"
                      className="block font-latoBold text-sm pb-2"
                    >
                      {" "}
                      <b>Patient ID: </b> {patientInfo.ID}
                    </label>
                    <label
                      htmlFor="ageInput"
                      className="block font-latoBold text-sm pb-2"
                    >
                      <b>Diagnosis: </b> {patientInfo.Diagnosis}{" "}
                      {patientInfo.OtherDiagnosis}
                    </label>
                    <label
                      htmlFor="ageInput"
                      className="block font-latoBold text-sm pb-2"
                    >
                      {" "}
                      <b>Age: </b>
                      {patientInfo.Age}
                    </label>
                    <label
                      htmlFor="ageInput"
                      className="block font-latoBold text-sm pb-2"
                    >
                      <b>{patientInfo.Description}</b>
                    </label>
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allPatientInfo.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setPatientInfo(item)}
              className="link_card"
            >
              <div className="copy_btn">
                <img
                  src={copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.ID}
              </p>
            </div>
          ))}
        </div>
        <br />
        <div>
          {" "}
          <h2 className="font-satoshi font-bold text-gray-600 text-xl">
            Enter New <span className="blue_gradient">Patient</span>
          </h2>
        </div>

        <form className="" onSubmit={handleSubmit}>
          {/* <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          /> */}
          <PatientIDInput
            patientInfo={patientInfo}
            setPatientInfo={setPatientInfo}
          ></PatientIDInput>
          <div className=" mt-5">
            <label
              htmlFor="ageInput"
              className="block font-latoBold text-sm pb-2"
            >
              Diagnosis:
            </label>
            <select
              value={patientInfo.Diagnosis}
              onChange={handleDiagnosisChange}
              required
              className="url_input peer"
            >
              <option value="">Select a diagnosis</option>
              <option value="Bipolar I">Bipolar I</option>
              <option value="Bipolar II">Bipolar II</option>
              <option value="Cyclothymic">Cyclothymic</option>
              <option value="Other">Other</option>
            </select>
            {patientInfo.Diagnosis === "Other" && (
              <input
                type="text"
                placeholder="Please specify"
                value={patientInfo.OtherDiagnosis}
                onChange={(e) =>
                  setPatientInfo({
                    ...patientInfo,
                    OtherDiagnosis: e.target.value,
                  })
                }
                required
                className="url_input peer"
              />
            )}
          </div>
          <div className="items-center mt-5">
            <label
              htmlFor="ageInput"
              className="block font-latoBold text-sm pb-2"
            >
              Age:
            </label>
            <input
              id="ageInput"
              type="number"
              value={patientInfo.Age}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, Age: Number(e.target.value) })
              }
              required
              className="url_input peer"
            />
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="black_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "
            >
              <p>Submit</p>
            </button>
          </div>
        </form>
        <br />
      </div>

      {/* {patientInfo.ID && (
        <div>
          <p>ID: {patientInfo.ID}</p>
          <p>Diagnosis: {patientInfo.Diagnosis}</p>
          <p>Description: {patientInfo.Description}</p>
        </div>
      )} */}
    </section>
  );
};

export default Summary;
