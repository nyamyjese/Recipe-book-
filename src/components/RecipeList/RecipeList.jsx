import RecipeCard from '../RecipeCard/RecipeCard.jsx'
import styles from './RecipeList.module.css'

export default function RecipeList({ recipes, pinnedIds, onTogglePin }) {
  return (
    <ul className={styles.list}>
      {recipes.map((recipe, index) => (
        <li key={recipe.id} className={styles.item}>
          <RecipeCard
            recipe={recipe}
            pinned={pinnedIds.includes(recipe.id)}
            onTogglePin={onTogglePin}
            index={index}
          />
        </li>
      ))}
    </ul>
  )
}