import { useContext, useState, createContext, useEffect } from "react";

const SubjectsContext = createContext();

export default function SubjectsProvider({ children }) {
  const [subjects, setSubjects] = useState([[], [], [], [], []]);

  useEffect(() => {
    console.log(subjects);
  }, [subjects]);

  return (
    <SubjectsContext.Provider
      value={{
        subjects,
        setSubjects,
      }}
    >
      {children}
    </SubjectsContext.Provider>
  );
}

export function useSubjects() {
  const context = useContext(SubjectsContext);
  const { subjects, setSubjects } = context;
  return { subjects, setSubjects };
}
