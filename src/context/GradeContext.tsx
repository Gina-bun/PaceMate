//what grade is the student in(grade?

import { createContext, useContext, useState, type ReactNode } from "react";

type Grade = 7 | 8 | 9 | null;

interface GradeContextType {
    grade: Grade;
    setGrade: (grade: Grade) => void;
}

const GradeContext = createContext<GradeContextType | undefined>(undefined);

export function GradeProvider({children}: {children: ReactNode}){
    const [grade, setGrade] = useState<Grade>(null);

    return (
        <GradeContext.Provider value={{grade, setGrade}}>
            {children}
        </GradeContext.Provider>
    )
}

export function useGrade(){
    const ctx = useContext(GradeContext);
    if (!ctx) throw new Error("useGrade must be used inside GradeProvider");
    return ctx;
}