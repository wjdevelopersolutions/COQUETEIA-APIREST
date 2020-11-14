/**
 * @Desc Get list of all admins
 * @route GET /api/v1/admin
 * @access Private
 */

export const getAdmin = (req, res, next) => {

  res.json({
    success: true,
    msg: 'Show all admin'
  });
}

/**
 * @Desc Create a new admin
 * @route POST /api/v1/admin
 * @access Private
 */

export const postAdmin = (req, res, next) => {

  res.json({
    success: true,
    msg: 'Create an admin'
  });
}

/**
 * @Desc Get a single admin
 * @route GET /api/v1/admin/:id
 * @access Private
 */

export const getAdminById = (req, res, next) => {

  res.json({
    success: true,
    msg: `Show admin ${req.params.id}`
  });
}

/**
 * @Desc Update e single admin
 * @route PUT /api/v1/admin/:id
 * @access Private
 */

export const updateAdmin = (req, res, next) => {

  res.json({
    success: true,
    msg: `Update admin ${req.params.id}`
  });
}

/**
 * @Desc Delete e single admin
 * @route DELETE /api/v1/admin/:id
 * @access Private
 */

export const deleteAdmin = (req, res, next) => {

  res.json({
    success: true,
    msg: `Delete admin ${req.params.id}`
  });
}

