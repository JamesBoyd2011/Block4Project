Select * from Items
where ($1::varchar is null) or (lower(name) like ('%' || lower($1) || '%')::varchar)
order by name