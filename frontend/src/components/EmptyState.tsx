interface Props {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <section className="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
