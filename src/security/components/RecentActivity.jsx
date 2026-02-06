const RecentActivity = () => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
      Recent Arrivals
    </h3>
    <div className="space-y-4">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
              JN
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">Jean Niyonsaba</p>
              <p className="text-[10px] text-gray-400">Ref: APT-2026-00{i}</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-gray-400">2m ago</span>
        </div>
      ))}
    </div>
  </div>
);