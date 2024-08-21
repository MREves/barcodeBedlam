GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;

CREATE TABLE "public.players" (
  "player_id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL
);

CREATE TABLE "public.friends" (
  "player_id_1" SERIAL NOT NULL,
  "player_id_2" SERIAL NOT NULL,
  FOREIGN KEY ("player_id_1") REFERENCES "public.players" ("player_id"),
  FOREIGN KEY ("player_id_2") REFERENCES "public.players" ("player_id")
);

CREATE TABLE "public.decks" (
  "deck_id" SERIAL PRIMARY KEY,
  "player_id" SERIAL NOT NULL,
  "name" TEXT NOT NULL
);

CREATE TABLE "public.races" (
  "race_id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "agility_mod" NUMERIC NOT NULL DEFAULT (0),
  "endurance_mod" NUMERIC NOT NULL DEFAULT (0),
  "hit_points_mod" NUMERIC NOT NULL DEFAULT (0),
  "luck_mod" NUMERIC NOT NULL DEFAULT (0),
  "strength_mod" NUMERIC NOT NULL DEFAULT (0)
);

CREATE TABLE "public.cards" (
  "card_id" SERIAL PRIMARY KEY,
  "race_id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "agility" NUMERIC NOT NULL DEFAULT (0),
  "endurance" NUMERIC NOT NULL DEFAULT (0),
  "hit_points" NUMERIC NOT NULL DEFAULT (0),
  "luck" NUMERIC NOT NULL DEFAULT (0),
  "strength" NUMERIC NOT NULL DEFAULT (0),
  "image_data" TEXT
  FOREIGN KEY ("race_id") REFERENCES "public.races" ("race_id"),
);

CREATE TABLE "public.deck_cards" (
  "deck_id" SERIAL NOT NULL,
  "card_id" SERIAL NOT NULL,
  FOREIGN KEY ("deck_id") REFERENCES "public.decks" ("deck_id"),
  FOREIGN KEY ("card_id") REFERENCES "public.cards" ("card_id")
);

CREATE TABLE "public.arenas" (
  "arena_id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL
);

CREATE TABLE "public.arena_race_modifiers" (
  "arena_id" SERIAL NOT NULL,
  "race_id" SERIAL NOT NULL,
  "arena_agility_mod" NUMERIC NOT NULL DEFAULT (0),
  "arena_endurance_mod" NUMERIC NOT NULL DEFAULT (0),
  "arena_hit_points_mod" NUMERIC NOT NULL DEFAULT (0),
  "arena_luck_mod" NUMERIC NOT NULL DEFAULT (0),
  "arena_strength_mod" NUMERIC NOT NULL DEFAULT (0),
  FOREIGN KEY ("arena_id") REFERENCES "public.arenas" ("arena_id"),
  FOREIGN KEY ("race_id") REFERENCES "public.races" ("race_id")
);

CREATE TABLE "public.match_data" (
  "arena_id" SERIAL NOT NULL,
  "player_id_1" SERIAL NOT NULL,
  "player_id_2" SERIAL NOT NULL,
  "deck_id_1" SERIAL NOT NULL,
  "deck_id_2" SERIAL NOT NULL,
  "match_date_time" TIMESTAMP NOT NULL DEFAULT NOW(),
  "winner_player_id" SERIAL NOT NULL
  FOREIGN KEY ("arena_id") REFERENCES "public.arenas" ("arena_id"),
  FOREIGN KEY ("player_id_1") REFERENCES "public.players" ("player_id"),
  FOREIGN KEY ("player_id_2") REFERENCES "public.players" ("player_id"),
  FOREIGN KEY ("deck_id_1") REFERENCES "public.decks" ("deck_id"),
  FOREIGN KEY ("deck_id_2") REFERENCES "public.decks" ("deck_id"),
  FOREIGN KEY ("winner_player_id") REFERENCES "public.players" ("player_id")
);

