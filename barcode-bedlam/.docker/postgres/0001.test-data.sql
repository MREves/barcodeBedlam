
INSERT INTO 
  "public.players"("name")
VALUES 
  ('Matt'),
  ('Drew');

INSERT INTO
  "public.friends"("player_id_1", "player_id_2")
VALUES
  (1,2);

INSERT INTO
  "public.races"("name", "agility_mod", "endurance_mod", "hit_points_mod", "luck_mod", "strength_mod")
VALUES
  ('Elf', 2, 0, 1, 1, -1),
  ('Dwarf', -1, 3, 0, 0, 2);

INSERT INTO
  "public.decks"("player_id", "name")
VALUES
  (1, 'warrior'),
  (2, 'tools of war');

INSERT INTO
  "public.cards"("race_id", "name", "agility", "endurance", "hit_points", "luck", "strength")
VALUES
  (1, 'Pirate', 49, 14, 11, 9, 101),
  (1, 'Skeleton', 40, 9, 91, 9, 29),
  (1, 'Ogre', 45, 12, 56, 7, 64),
  (2, 'Dwarf1', 49, 14, 11, 9, 101),
  (2, 'Dwarf2', 40, 9, 91, 9, 29),
  (2, 'Dwarf3', 45, 12, 56, 7, 64);


INSERT INTO
  "public.deck_cards"("deck_id", "card_id")
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 4),
  (2, 5),
  (2, 6);