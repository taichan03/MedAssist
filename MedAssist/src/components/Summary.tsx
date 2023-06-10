import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useLazyGetMedicationInfoQuery } from "../services/medicationsApi";
import PatientIDInput from "./form_components/PatientID.tsx";

const Summary = () => {
  const [patientInfo, setPatientInfo] = useState({
    ID: "",
    Diagnosis: "",
    OtherDiagnosis: "",
    Description: "",
    Age: 18,
  });
  const[allPatientInfo, setAllPatientInfo] = useState([]);

  const [getMedicationInfo, { error, isFetching }] =
    useLazyGetMedicationInfoQuery();

  useEffect(() => {
    const patienInfoFromLocalStorage = JSON.parse(
      localStorage.getItem('patientInfo')
    )
    if(patienInfoFromLocalStorage){
      setAllPatientInfo(patienInfoFromLocalStorage)
    }

  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await getMedicationInfo("");

    if (data?.description) {
      const newDescription = { ...patientInfo, Description: data.description };

      const updatedAllPatientInfo = [newDescription, ...allPatientInfo]
      setPatientInfo(newDescription);

      console.log("Logged new description");
      setAllPatientInfo(updatedAllPatientInfo)

    }
    else{
      console.log("No description came back");
    }
  };

  const handleDiagnosisChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'Other') {
      setPatientInfo({
        ...patientInfo,
        Diagnosis: selectedValue,
      });
    } else {
      setPatientInfo({
        ...patientInfo,
        Diagnosis: selectedValue,
        OtherDiagnosis: '', // Reset the OtherDiagnosis value
      });
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* {search} */}
      <div className="flex flex-col w-full gap-2">
        <form
          className=""
          onSubmit={handleSubmit}
        >
          {/* <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          /> */}
          <PatientIDInput patientInfo={patientInfo} setPatientInfo={setPatientInfo}></PatientIDInput>
          <div className=" mt-5">
          <label htmlFor="ageInput" className="block font-latoBold text-sm pb-2">
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
            {patientInfo.Diagnosis === 'Other' && (
                <input
                    type="text"
                    placeholder="Please specify"
                    value={patientInfo.OtherDiagnosis}
                    onChange={(e) =>
                        setPatientInfo({ ...patientInfo, OtherDiagnosis: e.target.value })
                    }
                    required
                    className="url_input peer"
                />
            )}
          </div>
          <div className="items-center mt-5">
          <label htmlFor="ageInput" className="block font-latoBold text-sm pb-2">
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

         {/* Display ID and Description */}
         {patientInfo.ID && (
            <div>
              <p>ID: {patientInfo.ID}</p>
              <p>Diagnosis: {patientInfo.Diagnosis}</p>
              <p>Description: {patientInfo.Description}</p>
            </div>
          )}
      </div>
    </section>
  );
};

export default Summary;
