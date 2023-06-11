


const PatientHistory = ({ allPatientInfo, setPatientInfo, copy }) => {
    return (
    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
        <br />
        <h2 className="font-satoshi font-bold text-gray-600 text-xl">
            Patient <span className="blue_gradient">History</span>
        </h2>
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
    );
};

export default PatientHistory;