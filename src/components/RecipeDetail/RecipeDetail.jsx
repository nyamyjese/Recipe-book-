import styles from './RecipeDetail.module.css'

export default function RecipeDetail({ recipe, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <img className={styles.image} src={recipe.image} alt={recipe.name} />
        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.badge}>{recipe.category}</span>
            <span className={styles.duration}>⏱ {recipe.duration} min</span>
          </div>
          <h2 className={styles.title}>{recipe.name}</h2>

          <h3 className={styles.section}>Ingredients</h3>
          <ul className={styles.ingredients}>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>

          <h3 className={styles.section}>Steps</h3>
          <ol className={styles.steps}>
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}