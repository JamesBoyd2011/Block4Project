UPDATE
    Comments
Set
    comment = $3,
    modifiedDate = now()
where
    id = $1
    and userId = $2 RETURNING *;