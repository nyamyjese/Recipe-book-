import RecipeCard from '../RecipeCard/RecipeCard.jsx'
import styles from './RecipeList.module.css'

export default function RecipeList({ recipes, onSelect }) {
  return (
    <ul className={styles.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id} className={styles.item}>
          <RecipeCard recipe={recipe} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  )
}
