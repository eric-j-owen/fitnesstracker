
"create-macros-table",
  `create table if not exists macros (
      id serial primary key,
      user_id int not null references users(id) on delete cascade,
      calories int not null,
      protein int not null,
      carbs int not null,
      fats int not null,
      date date not null,
      unique (user_id, date)
  );`;

"create-workouts-table",
  `create table if not exists workouts (
      id serial primary key,
      user_id int references users(id) on delete cascade,
      workout_name text not null,
      days text not null
    );`;

"create-exercises-table",
  `create table if not exists exercises (
      id serial primary key,
      user_id int not null references users(id) on delete cascade,
      exercise_name text not null,
      exercise_type text not null check (exercise_type in ('strength', 'cardio'))
    );`;

"create-workout_exercises_link",
  `create table if not exists workout_exercises_link (
      workout_id int references workouts(id) on delete cascade,
      exercise_id int references exercises(id) on delete cascade,
      sets int not null check (sets > 0),
      reps int not null check (reps > 0),
      weight decimal(6,2) not null,
      duration interval,
      distance decimal(6,2),
      primary key (workout_id, exercise_id)
    );`;
