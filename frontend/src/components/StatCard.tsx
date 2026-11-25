interface Props {
  title: string;
  value: string | number;
  description?: string;
}

export default function StatCard({
  title,
  value,
  description,
}: Props) {
  return (
    <div className="stat-card">
      <p className="stat-card-title">{title}</p>
      <h2 className="stat-card-value">{value}</h2>
      {description && (
        <p className="stat-card-description">{description}</p>
      )}
    </div>
  );
}
