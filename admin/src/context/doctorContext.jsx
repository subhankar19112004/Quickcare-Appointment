import { createContext } from "react";


export const DoctorContext = createContext();

const value = {}

const DoctorContextProvider = (props) => {
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider