-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create custom types
create type task_status as enum ('todo', 'in_progress', 'done');
create type task_priority as enum ('high', 'medium', 'low');

-- Create tasks table
create table public.tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  due_date timestamp with time zone not null,
  status task_status default 'todo' not null,
  priority task_priority default 'medium' not null,
  is_gcal_synced boolean default false not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create guest_contacts table
create table public.guest_contacts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  email text not null,
  name text,
  unique(user_id, email)
);

-- Create task_guests table (many-to-many relationship)
create table public.task_guests (
  task_id uuid references public.tasks(id) on delete cascade not null,
  guest_contact_id uuid references public.guest_contacts(id) on delete cascade not null,
  primary key (task_id, guest_contact_id)
);

-- Create indexes
create index tasks_user_id_idx on public.tasks(user_id);
create index tasks_due_date_idx on public.tasks(due_date);
create index tasks_status_idx on public.tasks(status);
create index guest_contacts_user_id_idx on public.guest_contacts(user_id);

-- Enable Row Level Security
alter table public.tasks enable row level security;
alter table public.guest_contacts enable row level security;
alter table public.task_guests enable row level security;

-- RLS Policies for tasks
create policy "Users can view their own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
  on public.tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tasks"
  on public.tasks for delete
  using (auth.uid() = user_id);

-- RLS Policies for guest_contacts
create policy "Users can view their own guest contacts"
  on public.guest_contacts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own guest contacts"
  on public.guest_contacts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own guest contacts"
  on public.guest_contacts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own guest contacts"
  on public.guest_contacts for delete
  using (auth.uid() = user_id);

-- RLS Policies for task_guests
create policy "Users can view guests for their own tasks"
  on public.task_guests for select
  using (
    exists (
      select 1 from public.tasks
      where tasks.id = task_guests.task_id
      and tasks.user_id = auth.uid()
    )
  );

create policy "Users can insert guests for their own tasks"
  on public.task_guests for insert
  with check (
    exists (
      select 1 from public.tasks
      where tasks.id = task_guests.task_id
      and tasks.user_id = auth.uid()
    )
  );

create policy "Users can delete guests from their own tasks"
  on public.task_guests for delete
  using (
    exists (
      select 1 from public.tasks
      where tasks.id = task_guests.task_id
      and tasks.user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for tasks updated_at
create trigger set_updated_at
  before update on public.tasks
  for each row
  execute function public.handle_updated_at();
