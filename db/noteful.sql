DROP TABLE IF EXISTS notes_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS folders;


CREATE TABLE folders (
    id serial PRIMARY KEY,
    name text NOT NULL
);

INSERT INTO folders (name) VALUES
    ('Archive'),
    ('Drafts'),
    ('Personal'),
    ('Work'),
    ('Bacon');

CREATE TABLE notes (
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now(),
  folder_id int REFERENCES folders(id) ON DELETE SET NULL
);

CREATE TABLE tags (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL
);

CREATE TABLE notes_tags (
  note_id INTEGER NOT NULL REFERENCES notes ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES TAGS ON DELETE CASCADE
);

INSERT INTO notes (title, content, folder_id) VALUES
  (
    '5 life lessons learned from cats',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
    1
  ),
  (
    'Bacon pastrami adipisicing, rump consectetur commodo beef ribs.',
    'Bacon pastrami adipisicing, rump consectetur commodo beef ribs.',
    2
  ),
  (
    'Qui nulla in picanha adipisicing.',
    'Qui nulla in picanha adipisicing.',
    1
  ),
  (
    'Alcatra bacon ut landjaeger, sunt cupidatat ad venison ex.',
    'Alcatra bacon ut landjaeger, sunt cupidatat ad venison ex.',
    3
  ),
  (
    'Consectetur sint nulla dolor bresaola, ullamco duis laborum swine capicola pariatur nisi.',
    'Consectetur sint nulla dolor bresaola, ullamco duis laborum swine capicola pariatur nisi.',
    4
  ),
  (
    'Drumstick frankfurter anim veniam, quis tenderloin ullamco nostrud bresaola ipsum.',
    'Drumstick frankfurter anim veniam, quis tenderloin ullamco nostrud bresaola ipsum.',
    5
  ),
  (
    'Commodo hamburger bresaola andouille ex pork loin doner jowl beef ribs swine velit minim ground round pork.',
    'Commodo hamburger bresaola andouille ex pork loin doner jowl beef ribs swine velit minim ground round pork.',
    2
  ),
  (
    'Enim ribeye prosciutto, jowl in ut tail.',
    'Enim ribeye prosciutto, jowl in ut tail.',
    3
  ),
  (
    'Cupidatat velit id esse.',
    'Cupidatat velit id esse.',
    1
  ),
  (
    'In kielbasa commodo, sint in corned beef filet mignon pork belly laborum sunt mollit aliquip.',
    'In kielbasa commodo, sint in corned beef filet mignon pork belly laborum sunt mollit aliquip.',
    1
  );

INSERT INTO tags (name) VALUES
  ('Fun'),
  ('Not'),
  ('Silly'),
  ('Serious'),
  ('Legendary');

INSERT INTO notes_tags (note_id, tag_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3);

SELECT title, tags.name, folders.name FROM notes
LEFT JOIN folders ON notes.folder_id = folders.id
LEFT JOIN notes_tags ON notes.id = notes_tags.note_id
LEFT JOIN tags ON notes_tags.tag_id = tags.id;