INSERT INTO Reviews(id,review,rating,itemId,userId) 
VALUES ($1,$2,$3,$4,$5) 
RETURNING *;