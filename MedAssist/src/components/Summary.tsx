import NewPatientForm from "./form_components/NewPatientForm.tsx";
import PatientHistory from "./form_components/PatientHistory.tsx";
import { useState } from "react";
import { useLazyGetMedicationInfoQuery } from "../services/medicationsApi.tsx";
import { copy } from "../assets";

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

  return (
      <div>
        <NewPatientForm
            patientInfo={patientInfo}
            setPatientInfo={setPatientInfo}
            allPatientInfo={allPatientInfo}
            setAllPatientInfo={setAllPatientInfo}
            getMedicationInfo={getMedicationInfo}
        />
        <PatientHistory
            allPatientInfo={allPatientInfo}
            setPatientInfo={setPatientInfo}
            copy={copy}
        />
      </div>
  );
};

export default Summary;