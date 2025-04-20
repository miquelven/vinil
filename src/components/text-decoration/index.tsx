export default function TextDecoration({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <span className={className}>{text}</span>;
}
