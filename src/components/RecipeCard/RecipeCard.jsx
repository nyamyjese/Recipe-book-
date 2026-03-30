import { useState } from 'react'
import styles from './RecipeCard.module.css'

export default function RecipeCard({ recipe, onSelect }) {
  const [pinned, setPinned] = useState(false)

  return (
    <article
      className={`${styles.card} ${pinned ? styles.pinned : ''}`}
      onClick={() => onSelect(recipe)}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={recipe.image} alt={recipe.name} />
        <span className={styles.duration}>{recipe.duration} min</span>
      </div>
      <div className={styles.body}>
        <span className={styles.badge}>{recipe.category}</span>
        <h2 className={styles.name}>{recipe.name}</h2>
        <button
          type="button"
          className={`${styles.pin} ${pinned ? styles.pinnedBtn : ''}`}
          onClick={(e) => { e.stopPropagation(); setPinned((p) => !p) }}
        >
          {pinned ? ' Pinned' : 'Pin'}
        </button>
      </div>
    </article>
  )
}