function StatCard({ icon, value, label }) {
  return (
    <div className="glass rounded-xl p-5">
      <div className="text-primary">{icon}</div>
      <div className="mt-3 text-2xl font-semibold text-primary">{value}</div>
      <div className="text-secondary text-sm">{label}</div>
    </div>
  );
}

export default StatCard;