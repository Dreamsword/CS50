select people.name from people
join stars on people.id=stars.person_id
join movies on stars.movie_id=movies.id
where year = 2004
group by people.name, stars.person_id
order by birth;