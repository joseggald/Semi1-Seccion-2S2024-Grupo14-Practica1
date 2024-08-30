-- Crear tabla de roles
CREATE TABLE roles (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL,
  description TEXT
);

-- Crear tabla de usuarios
CREATE TABLE users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  hashed_password TEXT NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
  role_id BIGINT REFERENCES roles(id) ON DELETE SET NULL,
  photo_url TEXT DEFAULT 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
  date_of_birth DATE
);

-- Crear tabla de sesiones de usuario (para manejar sesiones en múltiples dispositivos)
CREATE TABLE user_sessions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Crear tabla de canciones
CREATE TABLE songs (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  photo TEXT,
  duration INTERVAL NOT NULL,
  artist_name TEXT,
  mp3_file TEXT NOT NULL
);

-- Crear tabla de listas de reproducción
CREATE TABLE playlists (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  photo TEXT
);

-- Crear tabla de canciones en listas de reproducción
CREATE TABLE playlist_songs (
  playlist_id BIGINT REFERENCES playlists(id) ON DELETE CASCADE,
  song_id BIGINT REFERENCES songs(id) ON DELETE CASCADE,
  PRIMARY KEY (playlist_id, song_id)
);

-- Crear tabla de favoritos
CREATE TABLE favorites (
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  song_id BIGINT REFERENCES songs(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, song_id)
);

-- Insertar roles y usuario de ejemplo
INSERT INTO roles (name, description) VALUES ('admin', 'Administrator role with full access');
INSERT INTO roles (name, description) VALUES ('user', 'Regular user with standard permissions');

INSERT INTO users ( first_name, last_name, email, hashed_password, created_on, updated_on, role_id,date_of_birth)
VALUES (
  'example',
  'semi',
  'example@gmail.com',
  '$2b$12$2PfiQgGi6pjh/BxePX65I.UlDhCYx7VNXuOjctGYkBXgA5.frh2Tq',
  '2024-08-25 21:06:14.000313 +00:00',
  '2024-08-25 21:06:14.000313 +00:00',
  1,
  '1999-08-25'
);