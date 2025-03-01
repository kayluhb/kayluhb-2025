export function Avatar({ className = 'h-8 w-8 rounded-full' }: { className?: string }) {
  return <img className={className} src="/me.jpeg" alt="Caleb Brown" role="img" />;
}
