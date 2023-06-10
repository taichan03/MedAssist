import { useState, FormEvent, ChangeEvent } from "react";
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
  const [getMedicationInfo, { error, isFetching }] =
    useLazyGetMedicationInfoQuery();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await getMedicationInfo("");

    if (data?.Description) {
      const newDescription = { ...patientInfo, Description: data.Description };

      setPatientInfo(newDescription);

      console.log(newDescription);
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
          className="relative flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          {/* <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          /> */}
          <PatientIDInput patientInfo={patientInfo} setPatientInfo={setPatientInfo}></PatientIDInput>
          <div>
            <br />
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
          <h3>Symptom Severity</h3>
          <h3>Treatment Goals</h3>
          <h3>Age</h3>
          <input
            type="number"
            value={patientInfo.Age}
            onChange={(e) =>
              setPatientInfo({ ...patientInfo, Age: Number(e.target.value) })
            }
            required
            className="url_input peer" // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />
          <h3>Medical History</h3>
          <h3>Current Medications</h3>
          <h3>Allergies</h3>
          <h3>Additional Considerations</h3>
          
          {/* Display ID and Description */}
          {patientInfo.ID && (
            <div>
              <p>ID: {patientInfo.ID}</p>
              <p>Diagnosis: {patientInfo.Diagnosis}</p>
              <p>Description: {patientInfo.Description}</p>
            </div>
          )}
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="black_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "
            >
              <p>Submit</p>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Summary;
