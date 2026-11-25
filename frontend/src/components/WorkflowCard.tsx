interface Props {
  name: string;
  description: string;
  jobCount: number;
  status: string;
}

export default function WorkflowCard({
  name,
  description,
  jobCount,
  status,
}: Props) {
  return (
    <div className="workflow-card">
      <div className="workflow-card-header">
        <h3>{name}</h3>
        <span className="workflow-status">{status}</span>
      </div>

      <p>{description}</p>
      <span className="workflow-job-count">
        {jobCount} jobs
      </span>
    </div>
  );
}
