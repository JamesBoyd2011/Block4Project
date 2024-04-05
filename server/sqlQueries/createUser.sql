INSERT INTO Users(id,username,password) 
VALUES ($1,$2,$3) RETURNING *;