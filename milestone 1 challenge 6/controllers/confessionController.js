// Handle creation request and validate input before processing
function createConfession(req, res) {
  const validation = service.validateConfessionInput(req.body)

  // Reject invalid requests early to avoid unnecessary processing
  if (!validation.valid) {
    return res.status(400).json({ msg: validation.message })
  }

  const result = service.createConfession(req.body)
  res.status(201).json(result)
}

// Return all confessions along with count for frontend usage
function getAllConfessions(req, res) {
  const data = service.getAllConfessions()
  res.json({ data, count: data.length })
}

// Retrieve a confession by ID and handle missing cases
function getConfessionById(req, res) {
  const id = parseInt(req.params.id)
  const result = service.getConfessionById(id)

  // Return 404 if confession does not exist
  if (!result) return res.status(404).json({ msg: 'not found' })

  res.json(result)
}

// Validate category before filtering to avoid invalid queries
function getConfessionsByCategory(req, res) {
  const category = req.params.cat
  const allowed = ["bug", "deadline", "imposter", "vibe-code"]

  if (!allowed.includes(category)) {
    return res.status(400).json({ msg: 'invalid category' })
  }

  const result = service.getConfessionsByCategory(category)
  res.json(result)
}

// Secure delete endpoint using a token check
function deleteConfession(req, res) {
  // Prevent unauthorized deletion attempts
  if (req.headers['x-delete-token'] !== process.env.DELETE_TOKEN) {
    return res.status(403).json({ msg: 'no permission' })
  }

  const id = parseInt(req.params.id)
  const result = service.deleteConfession(id)

  // Handle case where item does not exist
  if (!result) return res.status(404).json({ msg: 'not found buddy' })

  res.json({ msg: "ok", item: result })
}