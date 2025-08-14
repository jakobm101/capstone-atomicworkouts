ATOMIC WORKOUTS


# Offline Mode Setup
fill offline database:
mongoimport --db 3 --collection workouts --file workouts.json --jsonArray
mongoimport --db 3 --collection exercises --file exercises.json --jsonArray