DELETE FROM
    Reviews 
where
    (userId = $2::uuid and id = $1::uuid) 
        RETURNING *;