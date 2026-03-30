import { useState } from 'react'
import recipes from './data/recipes.json'
import styles from './App.module.css'
import RecipeList from './components/RecipeList/RecipeList.jsx'

export default function App() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)
  const [searchQuery, setSearchQuery] = useState('')

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }

  const filteredRecipes = orderedRecipes.filter((recipe) =>
    searchQuery.trim() === ''
      ? true
      : recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
  )

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
          <button
            type="button"
            className={styles.toggle}
            onClick={handleToggleOrder}
          >
            Reverse order
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by ingredient..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.search}
        />
      </header>
      <main className={styles.main}>
        {filteredRecipes.length === 0 ? (
          <p className={styles.noResults}>No recipes found for "{searchQuery}"</p>
        ) : (
          <RecipeList recipes={filteredRecipes} />
        )}
      </main>
    </div>
  )
}