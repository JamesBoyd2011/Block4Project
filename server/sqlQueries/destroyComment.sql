DELETE FROM
    Comments 
where
    id = $1 and userId = $2
    RETURNING *;