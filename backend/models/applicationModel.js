import pool from "../config/db.js"

export const createApplication = async (data)=>{
  const {
    userId,
    company,
    role,
    location,
    status,
    applied_date,
    notes,
    salary,
    contact_email
  } = data;

  const result = await pool.query(
    "INSERT INTO applications (user_id, company, role, location, status, applied_date, notes, salary, contact_email) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
    [
      userId,
      company,
      role,
      location,
      status,
      applied_date || null,
      notes,
      salary,
      contact_email
    ]
  );
    return result.rows[0];
}

export const getApplicationsByUser = async (userId)=>{
    const result = await pool.query("SELECT * FROM applications WHERE user_id =$1 ORDER BY created_at DESC",[userId]);
    return result.rows;
}

export const getApplicationById = async(id,userId)=>{
  const result = await pool.query("SELECT * FROM applications WHERE id=$1 and user_id=$2", [id,userId]);
  return result.rows[0];
}

export const updateApplication = async (id, userId, data) => {
  const query = `
    UPDATE applications
    SET company=$1, role=$2, location=$3, status=$4,
        notes=$5, salary=$6, contact_email=$7
    WHERE id=$8 AND user_id=$9
    RETURNING *;
  `;

  const values = [
    data.company,
    data.role,
    data.location,
    data.status,
    data.notes,
    data.salary,
    data.contact_email,
    id,
    userId
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};
export const deleteApplication = async (id, userId) => {
  const result = await pool.query(
    "DELETE FROM applications WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, userId]
  );

  return result.rows[0];
};
