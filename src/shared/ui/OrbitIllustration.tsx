export function OrbitIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Orbit ring */}
      <div
        className="relative rounded-full"
        style={{
          width: 300,
          height: 300,
          border: '1.5px solid rgba(255,255,255,0.75)',
          boxShadow: '0 0 40px rgba(255,255,255,0.25), inset 0 0 20px rgba(255,255,255,0.15)',
        }}
      >
        {/* Sphere — top right (large, partially clipped) */}
        <div
          className="absolute"
          style={{ top: -30, right: -50, width: 110, height: 110, borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%, #A8C8FA, #4A7EE8 45%, #1E3DA0)' }}
        />

        {/* Sphere — center left (medium) */}
        <div
          className="absolute"
          style={{ top: '38%', left: -32, transform: 'translateY(-50%)', width: 68, height: 68, borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%, #A8C8FA, #4A7EE8 45%, #1E3DA0)' }}
        />

        {/* Sphere — bottom right (large) */}
        <div
          className="absolute"
          style={{ bottom: -20, right: -30, width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%, #A8C8FA, #4A7EE8 45%, #1E3DA0)' }}
        />
      </div>
    </div>
  )
}
