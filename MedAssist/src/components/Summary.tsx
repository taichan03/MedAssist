import { useState, FormEvent } from "react";
import linkIcon from "../assets/link.svg";
import { useLazyGetMedicationInfoQuery } from "../services/medicationsApi";

const Summary = () => {
  const [patientInfo, setPatientInfo] = useState({
    ID: "",
    Diagnosis: "",
    description: "",
  });
  const [getMedicationInfo, { error, isFetching }] =
    useLazyGetMedicationInfoQuery();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await getMedicationInfo("");

    if (data?.description) {
      const newDescription = { ...patientInfo, description: data.description };

      setPatientInfo(newDescription);

      console.log(newDescription);
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
          <input
            type="ID"
            placeholder="Patient ID:"
            value={patientInfo.ID}
            onChange={(e) =>
              setPatientInfo({ ...patientInfo, ID: e.target.value })
            }
            required
            className="url_input peer" // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />
          <input
            type="Text"
            placeholder="Patient Diagnosis:"
            value={patientInfo.Diagnosis}
            onChange={(e) =>
              setPatientInfo({ ...patientInfo, Diagnosis: e.target.value })
            }
            required
            className="url_input peer" // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />
          {/* Display ID and Description */}
          {patientInfo.ID && (
            <div>
              <p>ID: {patientInfo.ID}</p>
              <p>Diagnosis: {patientInfo.Diagnosis}</p>
              <p>Description: {patientInfo.description}</p>
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
