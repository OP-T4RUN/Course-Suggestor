CREATE TABLE user_credentials (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    google_id TEXT UNIQUE,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY REFERENCES user_credentials(id) ON DELETE CASCADE,
    name TEXT,
    bio TEXT,
    experience_level TEXT,
    education_level TEXT
);

CREATE TABLE mentor_profiles (
    user_id INT PRIMARY KEY REFERENCES user_credentials(id) ON DELETE CASCADE,
    expertise_area TEXT,
    years_of_experience INT,
    availability_status TEXT,
    verified BOOLEAN DEFAULT FALSE,
    rating FLOAT
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    category TEXT
);

CREATE TABLE user_skills (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_credentials(id) ON DELETE CASCADE,
    skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level INT CHECK (proficiency_level BETWEEN 1 AND 3),
    years_of_experience INT,
    UNIQUE(user_id, skill_id)
);

CREATE TABLE user_targets (
    user_id INT PRIMARY KEY REFERENCES user_credentials(id) ON DELETE CASCADE,
    target_job_role TEXT NOT NULL,
    target_location TEXT NOT NULL
);

CREATE TABLE learning_pathways (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_credentials(id) ON DELETE CASCADE,
    target_job_role TEXT,
    target_location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pathway_steps (
    id SERIAL PRIMARY KEY,
    pathway_id INT REFERENCES learning_pathways(id) ON DELETE CASCADE,
    step_order INT,
    step_type TEXT,
    title TEXT,
    description TEXT,
    estimated_time INT,
    difficulty TEXT
);

CREATE TABLE course_providers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    website_url TEXT
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    provider_id INT REFERENCES course_providers(id),
    title TEXT,
    course_url TEXT,
    duration INT,
    price_type TEXT
);

CREATE TABLE pathway_step_courses (
    id SERIAL PRIMARY KEY,
    pathway_step_id INT REFERENCES pathway_steps(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
    rank INT
);

CREATE TABLE progress_updates (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_credentials(id) ON DELETE CASCADE,
    pathway_step_id INT REFERENCES pathway_steps(id) ON DELETE CASCADE,
    status TEXT,
    progress_percent INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE review_requests (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_credentials(id) ON DELETE CASCADE,
    pathway_id INT REFERENCES learning_pathways(id) ON DELETE CASCADE,
    mentor_id INT REFERENCES user_credentials(id),
    status TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentor_suggestions (
    id SERIAL PRIMARY KEY,
    review_request_id INT REFERENCES review_requests(id) ON DELETE CASCADE,
    mentor_id INT REFERENCES user_credentials(id),
    suggestion_text TEXT,
);