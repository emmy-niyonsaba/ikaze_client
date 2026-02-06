const SecurityStats = () => (
  <div className="grid grid-cols-3 gap-3">
    {[
      { label: "Today", value: "24", color: "text-blue-600" },
      { label: "In", value: "12", color: "text-green-600" },
      { label: "Out", value: "8", color: "text-gray-600" },
    ].map((stat, i) => (
      <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
        <p className="text-[10px] uppercase font-black text-gray-400 mb-1">{stat.label}</p>
        <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
      </div>
    ))}
  </div>
);