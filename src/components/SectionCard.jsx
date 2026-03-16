export default function SectionCard({ title, items, icon }) {

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">

        <div className="p-2 bg-gray-100 rounded-lg">
          {icon}
        </div>

        <h3 className="font-semibold text-lg text-gray-800">
          {title}
        </h3>

      </div>

      {/* Items */}
      <ul className="flex flex-wrap gap-4 text-gray-700">

        {items.map((item, i) => (
          <span
            key={i}
            className="inline-block bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-sm font-medium transition"
          >
            {item}
          </span>
        ))}

      </ul>

    </div>
  )
}