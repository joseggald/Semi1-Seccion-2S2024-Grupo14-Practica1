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

INSERT INTO users (first_name, last_name, email, hashed_password, created_on, updated_on, role_id, date_of_birth) VALUES
('Jose', 'Galdamez', 'example2@gmail.com', '$2b$12$lscMZfMVmoEKb0LitSBlUeFW33bbuB47gmIkF67wdbkOEfx87ZUHG', '2024-08-27 01:31:32.470489 +00:00', '2024-08-27 01:31:32.470489 +00:00', 2, '2024-07-31'),
('José Eduardo', 'Galdámez González', 'eduardo_gonzalez2002@outlook.es', '$2b$12$xxq47Z.x8mtSs487BJa3qOQFKoIOmjQ48mrLHo45EVdx28tFO.moe', '2024-08-28 07:32:50.993959 +00:00', '2024-08-28 07:56:53.682492 +00:00', 2, '2024-08-01'),
('example', 'semi', 'example@gmail.com', '$2b$12$2PfiQgGi6pjh/BxePX65I.UlDhCYx7VNXuOjctGYkBXgA5.frh2Tq', '2024-08-25 21:06:14.000313 +00:00', '2024-08-28 08:10:25.808476 +00:00', 1, '1998-05-03'),
('Julk', 'Mann', 'luisafernandagaldamezgonzalez@gmail.com', '$2b$10$y6o9NAb/iIUMeRNCFPmxCOvUniKK4jQG4XuQcgfOhPkLnPPVYw37a', '2024-08-29 05:41:36.579000 +00:00', '2024-08-29 05:41:36.579000 +00:00', 1, '2024-07-31');


INSERT INTO songs (name, photo, duration, artist_name, mp3_file) VALUES
('1000CANCIONES', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/fotos/1000CANCIONES.png', INTERVAL '246 seconds', 'Álvaro Díaz', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/canciones/Alvaro+Diaz%2C+Sen+Senra+-+1000CANCIONES+(Official+Video).mp3'),
('Ticking Away', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/fotos/Ticking-Away-VCT-Champs-Anthem-Album-Art-1-scaled.jpg', INTERVAL '212 seconds', 'Grabbitz & bbno$', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/canciones/Ticking%20Away%20ft.%20Grabbitz%20%26%20bbno%24%20%28Official%20Music%20Video%29%20%20VALORANT%20Champions%202023%20Anthem.mp3'),
('Doblexxó', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/fotos/doblexxo.jpg', INTERVAL '190 seconds', 'J Balvin', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/canciones/J+Balvin%2C+Feid+-+Doblexx%C3%B3+(Official+Video).mp3'),
('Earfquake', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/fotos/earfquake.jpg', INTERVAL '246 seconds', 'Tyler The Creator', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/canciones/Tyler+The+Creator+-+Earfquake.mp3'),
('Esclava (Remix)', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/fotos/esclava.jpg', INTERVAL '205 seconds', 'Bryant Myers', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/canciones/Bryant+Myers+ft.+Anonimus%2C+Anuel+AA+y+Almighty+-+Esclava+Remix+(Video+Oficial).mp3'),
('FATAL FANTASSY', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/fotos/fatal-fantassy.jpg', INTERVAL '150 seconds', 'Álvaro Díaz', 'https://multimedia-semi1-seccion-g14.s3.amazonaws.com/canciones/da.mp3');
