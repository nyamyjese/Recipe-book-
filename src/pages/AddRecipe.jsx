import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AddRecipe.module.css'

export default function AddRecipe() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    category: '',
    duration: '',
    ingredients: '',
    steps: '',
  })

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newRecipe = {
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      duration: Number(form.duration),
      ingredients: form.ingredients.split(',').map((i) => i.trim()),
      steps: form.steps.split('\n').map((s) => s.trim()).filter(Boolean),
      image: `https://placehold.co/400x300?text=${encodeURIComponent(form.name)}`,
    }

    console.log('New recipe:', newRecipe)
    alert(`✅ Recipe "${newRecipe.name}" added!`)
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1 className={styles.title}>Add a Recipe</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Recipe name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Spaghetti Carbonara"
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
                placeholder="e.g. 30"
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
              placeholder="eggs, flour, butter, ..."
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
              placeholder={"Boil the water.\nAdd the pasta.\nServe hot."}
              rows={6}
              required
            />
            <span className={styles.hint}>One step per line</span>
          </div>

          <button type="submit" className={styles.submit}>
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  )
}