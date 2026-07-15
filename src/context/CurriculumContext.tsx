//now that you know the grade(whether 7, 8 or 9), what subjects/topics/quizzes should this student actually see?

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { SubjectData } from "../features/types";
import { useGrade } from "./GradeContext";


interface CurriculumContextType {
    subjects: SubjectData[];
    loading: boolean;
    error: Error | null;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

export function CurriculumProvider({children}: {children: ReactNode}) {
    const {grade} = useGrade();
    const [subjects, setSubjects] = useState<SubjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if(!grade) return;

        setLoading(true);
        setError(null);


        //import only the JSON files you need based on the student's grade.
        Promise.all([
            import(`../data/social-studies-grade${grade}.json`),
            // import(`../data/mathematics-jhs${grade}.json`),
            // import(`../data/english-jhs${grade}.json`),
            // import(`../data/science-jhs${grade}.json`),
        ]).then((modules) => {
            setSubjects(modules.map((mod) => mod.default as SubjectData));
            setLoading(false);

        })
        .catch((err) => {
            console.error("Failed to load curriculum data:", err);
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [grade]);

    return (
        <CurriculumContext.Provider value={{subjects, loading, error}}>
            {children}
        </CurriculumContext.Provider>
    );
}

export function useCurriculum() {
    const ctx = useContext(CurriculumContext);
    if(!ctx) throw new Error("useCurriculum must be used inside CurriculumProvider");
    return ctx;
}