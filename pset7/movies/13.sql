select distinct people.name from stars
join people on stars.person_id=people.id
where stars.movie_id in
(select stars.movie_id from people
join stars on people.id=stars.person_id
where people.name = 'Kevin Bacon'
and people.birth = 1958)
and name != 'Kevin Bacon';