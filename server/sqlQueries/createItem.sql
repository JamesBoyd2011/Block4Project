INSERT INTO Items(id,name,description) 
VALUES ($1,$2,$3) 
RETURNING *;