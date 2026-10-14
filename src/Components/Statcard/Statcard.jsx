function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>

    </div>
  );
}

export default StatCard;