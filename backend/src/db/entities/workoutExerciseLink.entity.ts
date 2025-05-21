// "create-workout_exercises_link",
//   `create table if not exists workout_exercises_link (
//       workout_id int references workouts(id) on delete cascade,
//       exercise_id int references exercises(id) on delete cascade,
//       sets int not null check (sets > 0),
//       reps int not null check (reps > 0),
//       weight decimal(6,2) not null,
//       duration interval,
//       distance decimal(6,2),
//       primary key (workout_id, exercise_id)
//     );`;
