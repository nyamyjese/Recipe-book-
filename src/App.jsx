import { useState } from 'react'
import recipes from './data/recipes.json'
import styles from './App.module.css'
import RecipeList from './components/RecipeList/RecipeList.jsx'
import RecipeDetail from './components/RecipeDetail/RecipeDetail.jsx'

export default function App() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }

  const filteredRecipes = orderedRecipes.filter((recipe) =>
    searchQuery.trim() === ''
      ? true
      : recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={styles.app}>

      {/* Panel détail */}
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
          <button type="button" className={styles.toggle} onClick={handleToggleOrder}>
            Reverse order
          </button>
        </div>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.search}
          />
          {searchQuery && (
            <button className={styles.clearBtn} onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
      </header>

      <main className={styles.main}>
        {filteredRecipes.length === 0 ? (
          <p className={styles.noResults}>No recipes found for "{searchQuery}"</p>
        ) : (
          <RecipeList recipes={filteredRecipes} onSelect={setSelectedRecipe} />
        )}
      </main>
    </div>
  )
}