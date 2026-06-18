import { ProjectsWithTechsType } from "./AllTechstackTypes";

export type ProjectFormProps = {
    type: "put" | "post"|"delete";
    project?:ProjectsWithTechsType;
    accessToken: string;
    onUnauthorized: () => void;
  };
  