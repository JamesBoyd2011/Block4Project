Select * from Items
where ($2::uuid is not null and id = $2::uuid) or ($2::uuid is null and lower(name) like ('%' || lower($1) || '%')::varchar)
order by name
LIMIT $3 
OFFSET ($4 - 1) * $3;