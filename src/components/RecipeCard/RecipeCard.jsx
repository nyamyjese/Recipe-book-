import styles from './RecipeCard.module.css'

export default function RecipeCard({ recipe, onSelect, pinned, onTogglePin }) {
  return (
    <article
      className={`${styles.card} ${pinned ? styles.pinned : ''}`}
      onClick={() => onSelect(recipe)}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={recipe.image} alt={recipe.name} />
        <span className={styles.duration}>{recipe.duration} min</span>
        {pinned && <span className={styles.pinnedBadge}>📌</span>}
      </div>
      <div className={styles.body}>
        <span className={styles.badge}>{recipe.category}</span>
        <h2 className={styles.name}>{recipe.name}</h2>
        <button
          type="button"
          className={`${styles.pin} ${pinned ? styles.pinnedBtn : ''}`}
          onClick={(e) => { e.stopPropagation(); onTogglePin(recipe.id) }}
        >
          {pinned ? 'Unpin' : 'Pin'}
        </button>
      </div>
    </article>
  )
}