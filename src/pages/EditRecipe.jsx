import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import recipes from '../data/recipes.json'
import styles from './EditRecipe.module.css'

export default function EditRecipe() {
  const { id } = useParams()
  const navigate = useNavigate()

  const recipe = recipes.find((r) => r.id === id)

  const [form, setForm] = useState({
    name: recipe?.name || '',
    category: recipe?.category || '',
    duration: recipe?.duration || '',
    ingredients: recipe?.ingredients.join(', ') || '',
    steps: recipe?.steps.join('\n') || '',
  })

  if (!recipe) {
    return (
      <div className={styles.notFound}>
        <p>Recipe not found.</p>
        <button onClick={() => navigate('/')}>← Back</button>
      </div>
    )
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const updatedRecipe = {
      ...recipe,
      name: form.name,
      category: form.category,
      duration: Number(form.duration),
      ingredients: form.ingredients.split(',').map((i) => i.trim()),
      steps: form.steps.split('\n').map((s) => s.trim()).filter(Boolean),
    }
    console.log('Updated recipe:', updatedRecipe)
    alert(`Recipe "${updatedRecipe.name}" updated!`)
    navigate(`/recipe/${id}`)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => navigate(`/recipe/${id}`)}>
          ← Back
        </button>
        <h1 className={styles.title}>Edit Recipe</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Recipe name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Category</label>
              <select
                className={styles.input}
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option>Pasta</option>
                <option>Soup</option>
                <option>Salad</option>
                <option>Main</option>
                <option>Dessert</option>
                <option>Breakfast</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Duration (min)</label>
              <input
                className={styles.input}
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Ingredients</label>
            <input
              className={styles.input}
              type="text"
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              required
            />
            <span className={styles.hint}>Separate with commas</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Steps</label>
            <textarea
              className={styles.textarea}
              name="steps"
              value={form.steps}
              onChange={handleChange}
              rows={6}
              required
            />
            <span className={styles.hint}>One step per line</span>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submit}>
              Save Changes
            </button>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => navigate(`/recipe/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}