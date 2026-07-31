import type { Subject } from "../features/types";

export type SubjectDisplayStatus = "in-progress" | "available" | "coming-soon";

interface SubjectRecord {
    subjectId: string;
    completed: boolean;
}

export function getSubjectStatus(
  subject: Subject,
  records: Record<string, SubjectRecord>,
): SubjectDisplayStatus {
  if (subject.comingSoon) return "coming-soon";
  const hasActivity = Object.values(records).some((r) => r.subjectId === subject.id);
  return hasActivity ? "in-progress" : "available";
}

export function getCompletedCount(
  subject: Subject,
  records: Record<string, SubjectRecord>,
): number {
  return Object.values(records).filter(
    (r) => r.subjectId === subject.id && r.completed,
  ).length;
}