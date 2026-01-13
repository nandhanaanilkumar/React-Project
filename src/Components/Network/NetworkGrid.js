import PeopleCard from "./PeopleCard";

const NetworkGrid = () => {
  const people = [
    { id: 1, name: "John Doe", role: "Frontend Developer" },
    { id: 2, name: "Jane Smith", role: "Backend Engineer" },
    { id: 3, name: "Alex Brown", role: "UI/UX Designer" },
    { id: 4, name: "Emily Clark", role: "Content Writer" },
    { id: 5, name: "Michael Lee", role: "DevOps Specialist" },
    { id: 6, name: "Sarah Wilson", role: "Product Manager" },
    { id: 7, name: "David Kim", role: "Data Scientist" },
    { id: 8, name: "Laura Martinez", role: "Marketing Expert" },
        { id: 9, name: "Michael Lee", role: "DevOps Specialist" },
    { id: 10, name: "Sarah Wilson", role: "Product Manager" },
    { id: 11, name: "David Kim", role: "Data Scientist" },
    { id: 12, name: "Laura Martinez", role: "Marketing Expert" },

  ];

  return (
    <div>
      <h5>People you may know</h5>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "20px"
      }}>
        {people.map(p => (
          <PeopleCard key={p.id} name={p.name} role={p.role} />
        ))}
      </div>
    </div>
  );
};

export default NetworkGrid;
