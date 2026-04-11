// Validate incoming confession data before any processing
function validateConfessionInput(confessionData) {

  // Prevent empty or missing request body
  if (!confessionData) return { valid: false, message: 'bad' }

  // Ensure text field exists
  if (!confessionData.text) return { valid: false, message: 'need text' }

  // Prevent empty confession submissions
  if (confessionData.text.length === 0) return { valid: false, message: 'too short' }

  // Limit text size to avoid excessive payload
  if (confessionData.text.length >= 500) {
    return { valid: false, message: 'text too big, must be less than 500 characters long buddy' }
  }

  // Only allow predefined categories to maintain consistency
  const allowedCategories = ["bug", "deadline", "imposter", "vibe-code"]

  if (!allowedCategories.includes(confessionData.category)) {
    return { valid: false, message: 'category not in stuff' }
  }

  return { valid: true }
}

// Create and store a new confession in memory
function createConfession(data) {
  const newConfession = {
    id: ++confessionIdCounter, // increment ID to ensure uniqueness
    text: data.text,
    category: data.category,
    created_at: new Date()
  }

  confessions.push(newConfession) // store confession in in-memory array
  return newConfession
}

// Return all confessions sorted by latest first
function getAllConfessions() {
  return confessions.sort((a, b) => b.created_at - a.created_at)
}

// Fetch a single confession using its unique ID
function getConfessionById(id) {
  return confessions.find(item => item.id === id)
}

// Filter confessions by category and reverse for latest-first order
function getConfessionsByCategory(category) {
  return confessions
    .filter(item => item.category === category)
    .reverse()
}

// Delete a confession safely by locating its index first
function deleteConfession(id) {
  const index = confessions.findIndex(item => item.id === id)

  // Return null if item does not exist
  if (index === -1) return null

  return confessions.splice(index, 1)[0]
}