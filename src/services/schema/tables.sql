drop table if exists profiles;
create table profiles (
  id uuid references auth.users primary key,
  name text,
  avatar text
);

create table profiles_private (
  id uuid references profiles(id) primary key,
  email text,
  admin boolean default false not null
);

alter table profiles_private
  enable row level security;

create policy "Profiles are only visible by the user who owns it"
  on profiles_private for select using (
    auth.uid() = id
  );
  

drop function if exists handle_new_user();
create function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into profiles (id, name, avatar)
  values (new.id, new.raw_user_meta_data::json->>'full_name', new.raw_user_meta_data::json->>'avatar_url');
  
  insert into profiles_private (id, email)
  values (new.id, new.email);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

create table posts (
  id uuid default extensions.uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  title text not null,
  
  user_id uuid default auth.uid() not null,
  constraint user_id foreign key(user_id) references profiles(id) on delete cascade
);

create table layers (
  id uuid default extensions.uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  image text not null,
  
  user_id uuid default auth.uid() not null,
  constraint user_id foreign key(user_id) references profiles(id) on delete cascade ,

  post_id uuid not null,
  constraint post_id foreign key(post_id) references posts(id) on delete cascade 
);

create table comments (
  id uuid default extensions.uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  content text not null,
  
  user_id uuid default auth.uid() not null,
  constraint user_id foreign key(user_id) references profiles(id) on delete cascade,

  post_id uuid not null,
  constraint post_id foreign key(post_id) references posts(id) on delete cascade 
);