export async function getProjects(order: string = "asc", search: string = "") {
    // Simulate fetching from an API or database
    const allProjects = [
      { id: 1, name: "Project One" },
      { id: 2, name: "Project Two" },
      { id: 3, name: "Another Project" },
    ];
  
    // Filter projects
    let filtered = allProjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  
    // Sort projects
    if (order === "desc") {
      filtered = filtered.reverse();
    }
  
    return filtered;
  }
  