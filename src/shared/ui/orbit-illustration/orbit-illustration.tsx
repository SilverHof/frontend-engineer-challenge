import { reatomComponent } from '@reatom/react'

import { orbitIllustrationVariants } from './orbit-illustration.variants'

export const OrbitIllustration = reatomComponent(() => {
  const styles = orbitIllustrationVariants()

  return (
    <div className={styles.root()}>
      <div
        className={styles.orbit()}
        style={{
          width: 300,
          height: 300,
          border: '1.5px solid rgba(255,255,255,0.75)',
          boxShadow: '0 0 40px rgba(255,255,255,0.25), inset 0 0 20px rgba(255,255,255,0.15)',
        }}
      >
        <div
          className={styles.sphereLarge()}
          style={{
            top: -30,
            right: -50,
            width: 110,
            height: 110,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 32%, #A8C8FA, #4A7EE8 45%, #1E3DA0)',
          }}
        />

        <div
          className={styles.sphereMedium()}
          style={{
            top: '38%',
            left: -32,
            transform: 'translateY(-50%)',
            width: 68,
            height: 68,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 32%, #A8C8FA, #4A7EE8 45%, #1E3DA0)',
          }}
        />

        <div
          className={styles.sphereLarge()}
          style={{
            bottom: -20,
            right: -30,
            width: 90,
            height: 90,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 32%, #A8C8FA, #4A7EE8 45%, #1E3DA0)',
          }}
        />
      </div>
    </div>
  )
}, 'OrbitIllustration')
