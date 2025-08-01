import { useEffect, useState } from "react"

const SUPABASE_URL = "https://your-supabase-url.supabase.co"
const SUPABASE_KEY = "public-anon-key"
const HEXES_ENDPOINT = `${SUPABASE_URL}/rest/v1/hexes?select=*`
const BATTLES_ENDPOINT = `${SUPABASE_URL}/rest/v1/battles`

export default function App() {
  const [hexes, setHexes] = useState([])
  const [selectedHex, setSelectedHex] = useState(null)
  const [battleForm, setBattleForm] = useState({
    region: "",
    winner: "",
    report: "",
  })

  useEffect(() => {
    fetch(HEXES_ENDPOINT, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setHexes(data))
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    fetch(BATTLES_ENDPOINT, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(battleForm),
    }).then(() => {
      alert("Schlachtbericht eingereicht!")
      setBattleForm({ region: "", winner: "", report: "" })
    })
  }

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🧭 AoS Kampagnenkarte</h1>
      <svg
        width="100%"
        height="400"
        viewBox="0 0 600 400"
        className="border"
      >
        {hexes.map((hex) => (
          <polygon
            key={`${hex.q}-${hex.r}`}
            points={getHexPoints(hex.q, hex.r)}
            fill={getFactionColor(hex.faction)}
            stroke="black"
            strokeWidth={selectedHex === hex.id ? 3 : 1}
            onClick={() => {
              setSelectedHex(hex.id)
              setBattleForm((prev) => ({ ...prev, region: hex.region_id }))
            }}
          >
            <title>{`Region: ${hex.region_id}\nFraktion: ${hex.faction}`}</title>
          </polygon>
        ))}
      </svg>

      {selectedHex && (
        <form
          className="mt-6 bg-gray-100 p-4 rounded space-y-3"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-semibold">Schlachtbericht</h2>
          <div>
            <label className="block">Siegerfraktion:</label>
            <select
              required
              value={battleForm.winner}
              onChange={(e) =>
                setBattleForm((prev) => ({ ...prev, winner: e.target.value }))
              }
              className="w-full border rounded p-1"
            >
              <option value="">– bitte wählen –</option>
              <option value="Ordnung">Ordnung</option>
              <option value="Chaos">Chaos</option>
              <option value="Tod">Tod</option>
              <option value="Zerstörung">Zerstörung</option>
            </select>
          </div>
          <div>
            <label className="block">Bericht:</label>
            <textarea
              value={battleForm.report}
              onChange={(e) =>
                setBattleForm((prev) => ({ ...prev, report: e.target.value }))
              }
              rows={4}
              className="w-full border rounded p-1"
              placeholder="Schreibe etwas zur Schlacht, Armeen oder Heldenmomenten..."
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
            Einreichen
          </button>
        </form>
      )}
    </main>
  )
}

function getHexPoints(q, r, size = 30) {
  const x = size * 3/2 * q
  const y = size * Math.sqrt(3) * (r + q / 2)
  const points = [...Array(6)].map((_, i) => {
    const angle = (Math.PI / 3) * i
    const px = x + size * Math.cos(angle)
    const py = y + size * Math.sin(angle)
    return `${px},${py}`
  })
  return points.join(" ")
}

function getFactionColor(faction) {
  switch (faction) {
    case "Ordnung": return "#4ea8de"
    case "Chaos": return "#c53030"
    case "Tod": return "#718096"
    case "Zerstörung": return "#38a169"
    default: return "#e2e8f0"
  }
}
