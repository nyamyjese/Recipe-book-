import { useParams, useNavigate } from 'react-router-dom'
import recipes from '../data/recipes.json'
import styles from './RecipeDetail.module.css'

export default function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const recipe = recipes.find((r) => r.id === id)

  if (!recipe) {
    return (
      <div className={styles.notFound}>
        <p>Recipe not found.</p>
        <button onClick={() => navigate('/')}>← Back</button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => navigate('/')}>
          ← Back
        </button>

        <img className={styles.image} src={recipe.image} alt={recipe.name} />

        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.badge}>{recipe.category}</span>
            <span className={styles.duration}>⏱ {recipe.duration} min</span>
          </div>

          <h1 className={styles.title}>{recipe.name}</h1>

          <div className={styles.actions}>
            <button
              className={styles.editBtn}
              onClick={() => navigate(`/edit/${recipe.id}`)}
            >
               Edit Recipe
            </button>
          </div>

          <h2 className={styles.section}>Ingredients</h2>
          <ul className={styles.ingredients}>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>

          <h2 className={styles.section}>Steps</h2>
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