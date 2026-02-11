import pool from "../config/db.js"

export const createApplication = async (data)=>{
  const {
    userId,
    company,
    role,
    location,
    status,
    applied_date,
    followup_date,
    notes,
    job_link,
    salary,
    contact_person
  } = data;

  const result = await pool.query("INSERT INTO applications (user_id, company, role, location, status, applied_date, followup_date, notes, job_link, salary, contact_person) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",    [
      userId,
      company,
      role,
      location,
      status,
      applied_date,
      followup_date,
      notes,
      job_link,
      salary,
      contact_person
    ]);
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
        followup_date=$5, notes=$6, salary=$7, contact_person=$8
    WHERE id=$9 AND user_id=$10
    RETURNING *;
  `;

  const values = [
    data.company,
    data.role,
    data.location,
    data.status,
    data.followup_date,
    data.notes,
    data.salary,
    data.contact_person,
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
