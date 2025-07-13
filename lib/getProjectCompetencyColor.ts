



export const getProjectCompetencyColor=(competency:number)=>{

  return  competency >= 75
    ? "green"
    : competency >= 50
    ? "#fcf81f"
    : competency >= 25
    ? "orange"
    : "red"

}