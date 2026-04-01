import { useState, useEffect } from 'react'
import recipes from './data/recipes.json'
import styles from './App.module.css'
import RecipeList from './components/RecipeList/RecipeList.jsx'

export default function App() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [pinnedIds, setPinnedIds] = useState([])
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setShowTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }

  function handleTogglePin(id) {
    setPinnedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const categories = ['All', ...new Set(recipes.map((r) => r.category))]

  const filteredRecipes = orderedRecipes.filter((recipe) => {
    const matchesSearch = searchQuery.trim() === ''
      ? true
      : recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All'
      ? true
      : recipe.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const sortedRecipes = [
    ...filteredRecipes.filter((r) => pinnedIds.includes(r.id)),
    ...filteredRecipes.filter((r) => !pinnedIds.includes(r.id)),
  ]

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>

          {/* Les deux boutons côte à côte */}
          <div className={styles.headerActions}>
            <a href="/add" className={styles.addBtn}>+ Add Recipe</a>
            <button type="button" className={styles.toggle} onClick={handleToggleOrder}>
              Reverse order
            </button>
          </div>
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

        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className={styles.main}>
        {sortedRecipes.length === 0 ? (
          <p className={styles.noResults}>No recipes found for "{searchQuery}"</p>
        ) : (
          <RecipeList
            recipes={sortedRecipes}
            pinnedIds={pinnedIds}
            onTogglePin={handleTogglePin}
          />
        )}
      </main>

      {showTop && (
        <button className={styles.backToTop} onClick={scrollToTop}>↑</button>
      )}
    </div>
  )
}