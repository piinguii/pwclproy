import Link from "next/link";

const ProjectsList = ({ projects }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <ul className="flex flex-col gap-4">
        {projects.map((project) => (
          <li key={project._id}>
            <Link href={`/hub/projects/${project._id}`}>
              <div className="border rounded p-4 hover:bg-gray-100 transition cursor-pointer">
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p className="text-sm text-gray-700 mb-1">{project.notes}</p>
                <p className="text-xs text-gray-500">Cliente ID: {project.clientId}</p>
                

              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
