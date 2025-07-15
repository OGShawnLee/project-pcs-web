export enum AcademicRole {
  ACADEMIC = "ACADEMIC",
  ACADEMIC_EVALUATOR = "ACADEMIC_EVALUATOR",
  EVALUATOR = "EVALUATOR",
}

export function getAcademicRoleLabel(role: AcademicRole): string {
  switch (role) {
    case AcademicRole.ACADEMIC:
      return "Académico";
    case AcademicRole.ACADEMIC_EVALUATOR:
      return "Académico Evaluador";
    case AcademicRole.EVALUATOR:
      return "Evaluador";
  }
}