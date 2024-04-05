INSERT INTO Comments(id,comment,userId,reviewId) 
VALUES ($1,$2,$3,$4) 
RETURNING *;